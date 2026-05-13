export type Palette = 'mint' | 'sky' | 'lavender' | 'peach' | 'rose';

export interface WorkInterval {
  start: number;
  end: number;
}

export interface WeekProgress {
  week: number;
  progress: 25 | 50 | 75 | 100;
}

export interface Task {
  id: string;
  label: string;
  intervals: WorkInterval[];
  weekProgress: WeekProgress[];
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
