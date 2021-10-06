import express, { json, Request, Response } from 'express';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import 'express-async-errors';

const app = express();

app.use(express.json());

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App in developement is running on ${PORT}`);
});
