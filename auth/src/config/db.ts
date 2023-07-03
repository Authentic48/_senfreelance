import mongoose from 'mongoose';

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, { user: process.env.MONGO_AUTH_USERNAME, pass: process.env.MONGO_AUTH_PASSWORD, });
    console.log('DB connected!!!');

  } catch (err) {
    console.error(err);
  }
};
