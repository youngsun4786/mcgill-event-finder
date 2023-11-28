export enum EventStatusType {
  SCHEDULED = 'scheduled',
  ONGOING = 'ongoing',
  CANCELLED = 'cancelled',
  DELAYED = 'delayed',
}

export type Post = {
  title: string;
  tags?: string[];
  location: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  status: 'scheduled' | 'ongoing' | 'cancelled' | 'delayed';
  description?: string;
};
