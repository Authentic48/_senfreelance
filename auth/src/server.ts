import { ConnectDB } from './config/db.config';
import { app } from './app';

const start = () => {
  ConnectDB();

  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () => {
    console.log(`App in developement is running on ${PORT}`);
  });
};

start();
