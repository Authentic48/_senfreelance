import { Subjects } from './subject';

export interface FreelancerUpdatedEvent {
  subject: Subjects.FreelancerUpdated;
  data: {
    id: string;
    name: string;
    bio: string;
    profession: string;
    email: string;
    phone: string;
    userId: string;
    version: number;
  };
}
