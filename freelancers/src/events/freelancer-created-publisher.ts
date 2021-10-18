import {
  Publisher,
  Subjects,
  FreelancerCreatedEvent,
} from '@senefreelance/common';

export class FreelancerCreatedPublisher extends Publisher<FreelancerCreatedEvent> {
  readonly subject = Subjects.FreelancerCreated;
}
