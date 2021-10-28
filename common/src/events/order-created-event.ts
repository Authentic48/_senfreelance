import { Orderstatus, Subjects } from '..';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: Orderstatus;
    userId: string;
    expiresAt: string;
    version: number;
    freelancer: {
      id: string;
      name: string;
      bio: string;
      profession: string;
      email: string;
      phone: string;
      userId: string;
    };
    price: number;
    task: string;
  };
}
