export interface TodoItem {
  name: string;
  duration: number;
  completedCount: number;
  missedDays: number;
  totalDays: number;
  recurrence?: 'daily' | 'weekly' | 'monthly';
  dayOfWeek?: number;
  dayOfMonth?: number;
  completedOn?: Array<Date>; // added property
  startTime?: any;
}
