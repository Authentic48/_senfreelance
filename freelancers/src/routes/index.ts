import express, { Request, Response } from 'express';
import { Freelancer } from '../models/freelancer';

const router = express.Router();

router.get('/api/freelancers/', async (req: Request, res: Response) => {
  const freelancers = await Freelancer.find({});

  return res.status(200).send(freelancers);
});

export { router as getAllFreelancersRoute };
