// constants.ts
export const EXCHANGE = 'tasks.x';
export const DLX = 'tasks.dlx';
export const QUEUES = {
  MAIN: 'tasks.q',
  RETRY: 'tasks.retry.q',
  DLQ: 'tasks.dlq',
} as const;

export const RoutingKey = {
  EMAIL_SEND: 'task.email.send',
  IMAGE_RESIZE: 'task.image.resize',
  RSS_DIGEST: 'task.rss.digest',
} as const;
