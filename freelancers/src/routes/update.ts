import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@senefreelance/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { FreelancerUpdatedPublisher } from '../events/freelancer-updated-publisher';
import { Freelancer } from '../models/freelancer';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.put(
  '/api/freelancers/:id',
  requireAuth,
  [
    body('phone').notEmpty().withMessage('phone is required'),
    body('bio').notEmpty().withMessage('bio is required'),
    body('profession').notEmpty().withMessage('profession is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { phone, bio, profession } = req.body;

    const freelancer = await Freelancer.findById(req.params.id);

    if (!freelancer) {
      throw new NotFoundError();
    }

    if (freelancer.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    freelancer.set({
      phone: phone,
      bio: bio,
      profession: profession,
    });

    await freelancer.save();

    await new FreelancerUpdatedPublisher(natsWrapper.client).publish({
      id: freelancer.id,
      phone: freelancer.phone,
      bio: freelancer.bio,
      email: freelancer.email,
      profession: freelancer.profession,
      userId: freelancer.userId,
      name: freelancer.name,
    });

    return res.status(200).send(freelancer);
  }
);

export { router as updateFreelancerRoute };
