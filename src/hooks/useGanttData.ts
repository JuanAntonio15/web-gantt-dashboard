import { useState, useEffect, useCallback } from 'react';
import type { GanttData, WeekProgress } from '../types';

const CYCLE: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];

function cycleWeek(weekProgress: WeekProgress[], week: number): WeekProgress[] {
  const idx = weekProgress.findIndex(wp => wp.week === week);
  if (idx === -1) {
    return [...weekProgress, { week, progress: 25 as const }].sort((a, b) => a.week - b.week);
  }
  const cur = weekProgress[idx].progress;
  const nextLevel = CYCLE[CYCLE.indexOf(cur) + 1];
  if (nextLevel === undefined) {
    return weekProgress.filter((_, i) => i !== idx);
  }
  return weekProgress.map((wp, i) => i === idx ? { ...wp, progress: nextLevel } : wp);
}

export function useGanttData() {
  const [data, setData] = useState<GanttData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<GanttData>;
      })
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(String(e)); setLoading(false); });
  }, []);

  const toggleWeek = useCallback((sectionId: string, taskId: string, week: number) => {
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
              return { ...task, weekProgress: cycleWeek(task.weekProgress, week) };
            }),
          };
        }),
      };
    });
  }, []);

  return { data, setData, loading, error, toggleWeek };
}
