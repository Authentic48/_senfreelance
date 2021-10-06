import express, { json, Request, Response } from 'express';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import 'express-async-errors';
import { signupRouter } from './routes/signup';
import { ConnectDB } from './config/db';

const app = express();
app.use(express.json());

ConnectDB();

app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App in developement is running on ${PORT}`);
});
