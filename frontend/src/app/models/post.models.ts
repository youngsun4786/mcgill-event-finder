import { User } from './user.models';

export enum EventStatusType {
  SCHEDULED = 'scheduled',
  ONGOING = 'ongoing',
  CANCELLED = 'cancelled',
  DELAYED = 'delayed',
}

export interface Post {
  _id?: string;
  author?: User;
  email: string;
  title: string;
  tags?: string[];
  location: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  status: EventStatusType;
  description?: string;
}
