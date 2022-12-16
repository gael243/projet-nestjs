export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN PROGRESS',
  ERROR = 'ERROR',
  OPEN = 'OPEN',
}
