import express, { json, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { errorHandler } from '../../common/src/middlewares/error-handler';
import { NotFoundError } from '../../common/src/errors/not-found-error';
import { signupRouter } from './routes/signup';
import { ConnectDB } from './config/db';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';

dotenv.config();

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

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App in developement is running on ${PORT}`);
});
