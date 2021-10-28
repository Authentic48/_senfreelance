import { Orderstatus, Subjects } from '..';

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    version: number;
    freelancer: {
      id: string;
    };
  };
}
