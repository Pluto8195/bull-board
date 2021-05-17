import { BaseAdapter } from '../src/queueAdapters/base';
import { STATUSES } from '../src/constants/statuses';

export type JobCleanStatus =
  | 'completed'
  | 'wait'
  | 'active'
  | 'delayed'
  | 'failed';

export type Status = keyof typeof STATUSES;

export type JobStatus = Status;

export type JobCounts = Record<JobStatus, number>;

export interface QueueAdapterOptions {
  readOnlyMode: boolean;
}

export type BullBoardQueues = Map<string, BaseAdapter>;

export interface QueueJob {
  opts: {
    delay?: number | undefined;
  };

  promote(): Promise<void>;

  remove(): Promise<void>;

  retry(): Promise<void>;

  toJSON(): QueueJobJson;
}

export interface QueueJobJson {
  // add properties as needed from real Bull/BullMQ jobs
  id?: string | undefined | number | null;
  name: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  progress: number | object;
  attemptsMade: number;
  finishedOn?: number | null;
  processedOn?: number | null;
  timestamp: number;
  failedReason: string;
  stacktrace: string[] | null;
  data: any;
  returnvalue: any;
  opts: any;
  parentKey?: string;
}

export interface ValidMetrics {
  total_system_memory: string;
  redis_version: string;
  used_memory: string;
  mem_fragmentation_ratio: string;
  connected_clients: string;
  blocked_clients: string;
}

export interface AppJob {
  id: QueueJobJson['id'];
  name: QueueJobJson['name'];
  timestamp: QueueJobJson['timestamp'];
  processedOn?: QueueJobJson['processedOn'];
  finishedOn?: QueueJobJson['finishedOn'];
  progress: QueueJobJson['progress'];
  attempts: QueueJobJson['attemptsMade'];
  failedReason: QueueJobJson['failedReason'];
  stacktrace: string[];
  delay: number | undefined;
  opts: QueueJobJson['opts'];
  data: QueueJobJson['data'];
  returnValue: QueueJobJson['returnvalue'];
}

export interface AppQueue {
  name: string;
  counts: Record<Status, number>;
  jobs: AppJob[];
  readOnlyMode: boolean;
}