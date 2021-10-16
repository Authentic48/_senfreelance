import { app } from './app';
import { ConnectDB } from './config/db';

const start = () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  ConnectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`App in developement is running on ${PORT}`);
  });
};
