import { requireAuth, validateRequest } from '@senefreelance/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Freelancer } from '../models/freelancer';

const router = express.Router();

router.post(
  '/api/freelancers/',
  requireAuth,
  [
    body('phone').notEmpty().withMessage('phone is required'),
    body('bio').notEmpty().withMessage('bio is required'),
    body('profession').notEmpty().withMessage('profession is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { phone, bio, profession } = req.body;

    const freelancer = Freelancer.build({
      name: req.currentUser!.name,
      phone: phone,
      email: req.currentUser!.email,
      profession: profession,
      bio: bio,
      userId: req.currentUser!.id,
    });
    await freelancer.save();

    return res.status(201).send(freelancer);
  }
);

export { router as createFreelancerRoute };
