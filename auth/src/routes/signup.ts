import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@senefreelance/common';
import { User } from '../models/user-model';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('name').notEmpty().withMessage('Please Enter your name'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, email, password, isFreelancer } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = await User.create({
      name,
      email,
      password,
      isFreelancer,
    });

    const userjwt = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        isFreelancer: user.isFreelancer,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userjwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
