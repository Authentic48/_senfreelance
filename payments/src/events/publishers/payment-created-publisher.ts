import {
  Subjects,
  PaymentCreatedEvent,
  Publisher,
} from '@senefreelance/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
