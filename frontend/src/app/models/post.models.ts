import { User } from './user.models';

export enum EventStatusType {
  SCHEDULED = 'scheduled',
  ONGOING = 'ongoing',
  CANCELLED = 'cancelled',
  DELAYED = 'delayed',
}

export interface Post {
  _id?: string;
  author: User;
  title: string;
  tags?: string[];
  location: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  status: 'scheduled' | 'ongoing' | 'cancelled' | 'delayed';
  description?: string;
}
