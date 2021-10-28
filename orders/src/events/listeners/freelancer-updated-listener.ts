import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  FreelancerUpdatedEvent,
} from '@senefreelance/common';
import { queueGroupName } from './queue-group-name';
import { Freelancer } from '../../models/freelancer';

export class FreelancerUpdatedListener extends Listener<FreelancerUpdatedEvent> {
  readonly subject = Subjects.FreelancerUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: FreelancerUpdatedEvent['data'], msg: Message) {
    const { bio, name, email, phone, userId, profession, id } = data;

    const freelancer = await Freelancer.findByEvent(data);

    if (!freelancer) {
      throw new Error('Freelancer not found');
    }

    freelancer.set({
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
