import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  FreelancerCreatedEvent,
} from '@senefreelance/common';
import { queueGroupName } from './queue-group-name';
import { Freelancer } from '../../models/freelancer';

export class FreelancerCreatedListener extends Listener<FreelancerCreatedEvent> {
  readonly subject = Subjects.FreelancerCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: FreelancerCreatedEvent['data'], msg: Message) {
    const { bio, name, email, phone, userId, profession, id } = data;

    const freelancer = Freelancer.build({
      id,
      name,
      email,
      phone,
      userId,
      profession,
      bio,
    });

    await freelancer.save();

    msg.ack();
  }
}
