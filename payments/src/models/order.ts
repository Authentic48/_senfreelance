import mongoose, { version } from 'mongoose';
import { Orderstatus } from '@senefreelance/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAttrs {
  userId: string;
  status: Orderstatus;
  price: number;
  task: string;
  id: string;
  version: number;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: Orderstatus;
  price: number;
  task: string;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(Orderstatus),
      default: Orderstatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    price: {
      type: Number,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    task: attrs.task,
    price: attrs.price,
    status: attrs.status,
    userId: attrs.userId,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
