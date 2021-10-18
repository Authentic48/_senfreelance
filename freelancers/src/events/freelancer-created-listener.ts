import {
  Listener,
  Subjects,
  FreelancerCreatedEvent,
} from '@senefreelance/common';
import { Message } from 'node-nats-streaming';

export class FreelancerCreatedListener extends Listener<FreelancerCreatedEvent> {
  readonly subject = Subjects.FreelancerCreated;
  queueGroupName = 'freelancers-servce';

  onMessage(data: FreelancerCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);
    msg.ack();
  }
}
