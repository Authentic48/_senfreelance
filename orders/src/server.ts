import { app } from './app';
import { ConnectDB } from './config/db';
import { natsWrapper } from './natsWrapper';
import { FreelancerCreatedListener } from './events/listeners/freelancer-created-listener';
import { FreelancerUpdatedListener } from './events/listeners/freelancer-updated-listener';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  );

  natsWrapper.client.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  process.on('SIGINT', () => natsWrapper.client.close());
  process.on('SIGTERM', () => natsWrapper.client.close());

  new FreelancerUpdatedListener(natsWrapper.client).listen();
  new FreelancerCreatedListener(natsWrapper.client).listen();

  ConnectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`App in developement is running on ${PORT}`);
  });
};

start();
