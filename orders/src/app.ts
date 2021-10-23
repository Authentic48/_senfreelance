import express, { json, Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from '@senefreelance/common';
import { newOrderRoute } from './routes/new';
import { updateOrderRoute } from './routes/delete';
import { showOrderRoute } from './routes/show';
import { indexOrdersRoute } from './routes';

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

app.use(newOrderRoute);
app.use(updateOrderRoute);
app.use(showOrderRoute);
app.use(indexOrdersRoute);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
