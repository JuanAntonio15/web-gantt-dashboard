import { useState, useEffect, useCallback } from 'react';
import type { GanttData, Progress } from '../types';

const PROGRESS_STEPS: Progress[] = [0, 25, 50, 75, 100];

export function useGanttData() {
  const [data, setData] = useState<GanttData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('./data.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<GanttData>;
      })
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(String(e)); setLoading(false); });
  }, []);

  const cycleProgress = useCallback((sectionId: string, taskId: string) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map(sec => {
          if (sec.id !== sectionId) return sec;
          return {
            ...sec,
            tasks: sec.tasks.map(task => {
              if (task.id !== taskId) return task;
              const idx = PROGRESS_STEPS.indexOf(task.progress);
              return { ...task, progress: PROGRESS_STEPS[(idx + 1) % PROGRESS_STEPS.length] };
            }),
          };
        }),
      };
    });
  }, []);

  return { data, setData, loading, error, cycleProgress };
}
