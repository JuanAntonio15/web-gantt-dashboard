export type Palette = 'mint' | 'sky' | 'lavender' | 'peach' | 'rose';
export type Progress = 0 | 25 | 50 | 75 | 100;

export interface Task {
  id: string;
  label: string;
  startWeek: number;
  endWeek: number;
  progress: Progress;
}

export interface Section {
  id: string;
  label: string;
  palette: Palette;
  tasks: Task[];
}

export interface GanttData {
  client: string;
  project: string;
  phase: string;
  title: string;
  months: number;
  weeks: number;
  sections: Section[];
}
