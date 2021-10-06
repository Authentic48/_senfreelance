import mongoose from 'mongoose';

export const ConnectDB = async () => {
  try {
    await mongoose.connect('mongodb://admin:password@mongodb');
    console.log('DB connected!!!');
  } catch (err) {
    console.error(err);
  }
};
