import { requireAuth, validateRequest } from '@senefreelance/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Freelancer } from '../models/freelancer';
import { FreelancerCreatedPublisher } from '../events/freelancer-created-publisher';
import { natsWrapper } from '../natsWrapper';

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

    await new FreelancerCreatedPublisher(natsWrapper.client).publish({
      id: freelancer.id,
      phone: freelancer.phone,
      bio: freelancer.bio,
      email: freelancer.email,
      profession: freelancer.profession,
      userId: freelancer.userId,
      name: freelancer.name,
      version: freelancer.version,
    });

    return res.status(201).send(freelancer);
  }
);

export { router as createFreelancerRoute };
