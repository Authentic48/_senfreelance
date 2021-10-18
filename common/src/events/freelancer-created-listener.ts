import { Subjects } from './subject';

export interface FreelancerCreatedEvent {
  subject: Subjects.FreelancerCreated;
  data: {
    id: string;
    name: string;
    bio: string;
    profession: string;
    email: string;
    phone: string;
    userId: string;
  };
}
