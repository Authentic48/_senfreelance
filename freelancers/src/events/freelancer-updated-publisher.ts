import {
  Publisher,
  Subjects,
  FreelancerUpdatedEvent,
} from '@senefreelance/common';

export class FreelancerUpdatedPublisher extends Publisher<FreelancerUpdatedEvent> {
  readonly subject = Subjects.FreelancerUpdated;
}
