import express, { Request, Response } from 'express';
import { requireAuth } from '@senefreelance/common';
import { body } from 'express-validator';

const router = express.Router();

router.get(
  '/api/orders',
  requireAuth,
  [body('task').notEmpty().withMessage('task is required')],
  async (req: Request, res: Response) => {}
);

export { router as indexOrdersRoute };
