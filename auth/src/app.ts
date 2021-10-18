import express, { json, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@senefreelance/common';
import { signupRouter } from './routes/signup';
import { ConnectDB } from './config/db';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';

const app = express();
app.use(express.json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
