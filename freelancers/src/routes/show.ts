import { NotFoundError } from '@senefreelance/common';
import express, { Request, Response } from 'express';
import { Freelancer } from '../models/freelancer';

const router = express.Router();

router.get('/api/freelancers/:id', async (req: Request, res: Response) => {
  const freelancer = await Freelancer.findById(req.params.id);

  if (!freelancer) {
    throw new NotFoundError();
  }

  return res.status(200).send(freelancer);
});

export { router as showFreelancerRoute };
