import express from 'express';
import 'dotenv/config';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@senefreelance/common';
import { container } from './config/ioc/index';
import { TYPES } from './config/ioc/types';
import { AuthController } from './controllers/auth.controller';

const app = express();
app.use(express.json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  }),
);

app.use('/api/auth/', container.get<AuthController>(TYPES.AuthController).router());

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
