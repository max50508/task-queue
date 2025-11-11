import { TaskEnum } from '../enum/task.enum';

export type TaskType = `${TaskEnum}`;

export interface BaseTaskType<T = any> {
  id: string;
  type: TaskType;
  payload: T;
  idempotencyKey?: string;
  createdAt: string;
}
