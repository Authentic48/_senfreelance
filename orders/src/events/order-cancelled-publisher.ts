import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@senefreelance/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
