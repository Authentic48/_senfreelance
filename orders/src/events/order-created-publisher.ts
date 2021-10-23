import { Publisher, OrderCreatedEvent, Subjects } from '@senefreelance/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
