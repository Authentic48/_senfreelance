import { Orderstatus } from '@senefreelance/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import mongoose from 'mongoose';
import { Order } from './order';

interface FreelancerAttrs {
  name: string;
  email: string;
  phone: string;
  bio: string;
  profession: string;
  userId: string;
  id: string;
}

export interface FreelancerDoc extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  bio: string;
  profession: string;
  userId: string;
  version: number;
  isBusy(): Promise<boolean>;
}

interface FreelancerModel extends mongoose.Model<FreelancerDoc> {
  build(attrs: FreelancerAttrs): FreelancerDoc;
}
const freelancerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

freelancerSchema.statics.build = (attrs: FreelancerAttrs) => {
  return new Freelancer({
    _id: attrs.id,
    name: attrs.name,
    email: attrs.email,
    phone: attrs.phone,
    bio: attrs.bio,
    userId: attrs.userId,
    profession: attrs.profession,
  });
};
freelancerSchema.set('versionKey', 'version');
freelancerSchema.plugin(updateIfCurrentPlugin);
freelancerSchema.methods.isBusy = async function () {
  const existingOrder = await Order.findOne({
    freelancer: this as any,
    status: {
      $in: [Orderstatus.Created, Orderstatus.AwaitingPayment],
    },
  });

  return !!existingOrder;
};

const Freelancer = mongoose.model<FreelancerDoc, FreelancerModel>(
  'Freelancer',
  freelancerSchema
);

export { Freelancer };
