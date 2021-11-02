import { Listener, OrderCreatedEvent, Subjects } from '@senefreelance/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.price,
      status: data.status,
      version: data.version,
      userId: data.userId,
      task: data.task,
    });

    await order.save();

    msg.ack();
  }
}
