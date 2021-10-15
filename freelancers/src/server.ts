import express, { json, Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@senefreelance/common';
import { ConnectDB } from './config/db';

import { createFreelancerRoute } from './routes/new';
import { updateFreelancerRoute } from './routes/update';
import { getAllFreelancersRoute } from './routes';
import { showFreelancerRoute } from './routes/show';

const app = express();
app.use(express.json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
ConnectDB();

app.use(createFreelancerRoute);
app.use(updateFreelancerRoute);
app.use(getAllFreelancersRoute);
app.use(showFreelancerRoute);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App in developement is running on ${PORT}`);
});
