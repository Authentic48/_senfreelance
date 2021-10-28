import mongoose from 'mongoose';
import { Orderstatus } from '@senefreelance/common';
import { FreelancerDoc } from './freelancer';

interface OrderAttrs {
  userId: string;
  status: Orderstatus;
  expiresAt: Date;
  freelancer: FreelancerDoc;
  price: number;
  task: string;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: Orderstatus;
  expiresAt: Date;
  freelancer: FreelancerDoc;
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
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Freelancer',
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
