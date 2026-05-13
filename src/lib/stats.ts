import type { GanttData } from '../types';

export function computeStats(data: GanttData) {
  const tasks = data.sections.flatMap(s => s.tasks);
  const total = tasks.length;
  const sum = tasks.reduce((a, t) => a + t.progress, 0);
  const overall = total > 0 ? Math.round(sum / total) : 0;
  const done = tasks.filter(t => t.progress === 100).length;

  let statusLabel: string;
  let stateText: string;
  let dotColor: string;

  if (overall >= 100) {
    statusLabel = 'Completa'; stateText = 'Lista'; dotColor = '#3F8B5A';
  } else if (overall >= 75) {
    statusLabel = 'Avanzada'; stateText = 'Avanzada'; dotColor = '#3F8B5A';
  } else if (overall >= 50) {
    statusLabel = 'En curso'; stateText = 'En curso'; dotColor = '#D4A017';
  } else if (overall >= 25) {
    statusLabel = 'Iniciada'; stateText = 'Iniciada'; dotColor = '#D4A017';
  } else if (overall > 0) {
    statusLabel = 'En marcha'; stateText = 'Arrancando'; dotColor = '#B97442';
  } else {
    statusLabel = 'Por arrancar'; stateText = 'Inicio'; dotColor = '#B8B1A4';
  }

  return { overall, done, total, statusLabel, stateText, dotColor };
}

export function sectionProgress(tasks: GanttData['sections'][number]['tasks']): number {
  if (!tasks.length) return 0;
  return Math.round(tasks.reduce((a, t) => a + t.progress, 0) / tasks.length);
}
