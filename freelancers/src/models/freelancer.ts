import mongoose from 'mongoose';

interface FreelancerAttrs {
  name: string;
  email: string;
  phone: string;
  bio: string;
  profession: string;
  userId: string;
}

interface FreelancerDoc extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  bio: string;
  profession: string;
  userId: string;
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
      required: true,
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
  return new Freelancer(attrs);
};

const Freelancer = mongoose.model<FreelancerDoc, FreelancerModel>(
  'Freelancer',
  freelancerSchema
);

export { Freelancer };
