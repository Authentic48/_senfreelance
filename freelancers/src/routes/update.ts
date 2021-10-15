import express, { Request, Response } from 'express';

const router = express.Router();

router.put('/api/freelancers/:id', (req: Request, res: Response) => {
  return res.send({});
});

export { router as updateFreelancerRoute };
