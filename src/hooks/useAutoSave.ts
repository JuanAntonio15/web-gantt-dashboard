import { useEffect, useRef, useState } from 'react';
import type { GanttData } from '../types';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export function useAutoSave(data: GanttData | null) {
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (!data) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    setSaveState('saving');

    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data, null, 2),
        });
        setSaveState(res.ok ? 'saved' : 'error');
        if (res.ok) setTimeout(() => setSaveState('idle'), 2000);
      } catch {
        setSaveState('error');
      }
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data]);

  return saveState;
}
