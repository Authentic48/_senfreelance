import express, { json, Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from '@senefreelance/common';

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

app.use(currentUser);

app.use(createFreelancerRoute);
app.use(updateFreelancerRoute);
app.use(getAllFreelancersRoute);
app.use(showFreelancerRoute);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
