import express, { json, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@senefreelance/common';
import { ConnectDB } from './config/db';

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

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App in developement is running on ${PORT}`);
});
