import { requireAuth, validateRequest } from '@senefreelance/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

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
  (req: Request, res: Response) => {
    return res.send({});
  }
);

export { router as createFreelancerRoute };
