import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@senefreelance/common';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('PasswordService must be supplied'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // const { email, password } = req.body;
    //
    // const existingUser = await User.findOne({ email });
    //
    // if (!existingUser) {
    //   throw new BadRequestError('Invalid credentials');
    // }
    //
    // const passwordsMatch = await PasswordService.compare(
    //   password,
    //   existingUser.password
    // );
    //
    // if (!passwordsMatch) {
    //   throw new BadRequestError('Invalid credentials');
    // }

    res.status(200);
  },
);

export { router as signinRouter };
