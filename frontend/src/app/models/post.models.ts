import { User } from "./user.models";

export enum EventStatusType {
  SCHEDULED = 'scheduled',
  ONGOING = 'ongoing',
  CANCELLED = 'cancelled',
  DELAYED = 'delayed',
}

export type Post = {
  author: User;
  title: string;
  tags?: string[];
  location: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  status: 'scheduled' | 'ongoing' | 'cancelled' | 'delayed';
  description?: string;
};
