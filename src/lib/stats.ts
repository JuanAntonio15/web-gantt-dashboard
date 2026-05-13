import type { GanttData, Task } from '../types';

function intervalTotalWeeks(task: Task): number {
  return task.intervals.reduce((a, iv) => a + (iv.end - iv.start + 1), 0);
}

function weekInIntervals(task: Task, week: number): boolean {
  return task.intervals.some(iv => week >= iv.start && week <= iv.end);
}

function taskEarned(task: Task): number {
  return task.weekProgress
    .filter(wp => weekInIntervals(task, wp.week))
    .reduce((a, wp) => a + wp.progress, 0);
}

export function taskProgress(task: Task): number {
  const totalWeeks = intervalTotalWeeks(task);
  if (totalWeeks === 0) return 0;
  return Math.min(100, Math.round(taskEarned(task) / (totalWeeks * 100) * 100));
}

export function computeStats(data: GanttData) {
  const tasks = data.sections.flatMap(s => s.tasks);
  const totalMax = tasks.reduce((a, t) => a + intervalTotalWeeks(t) * 100, 0);
  const totalEarned = tasks.reduce((a, t) => a + taskEarned(t), 0);
  const overall = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
  return { overall };
}

export function sectionProgress(tasks: Task[]): number {
  const totalMax = tasks.reduce((a, t) => a + intervalTotalWeeks(t) * 100, 0);
  const totalEarned = tasks.reduce((a, t) => a + taskEarned(t), 0);
  return totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
}

export { weekInIntervals };
