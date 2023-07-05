import { injectable, inject } from 'inversify';
import { Request, Response, Router } from 'express';
import asyncWrapper from 'async-wrapper-express-ts';
import { AuthService } from '../services/auth.service';
import { IController } from './controller.interface';
import { TYPES } from '../config/ioc/types';

@injectable()
export class AuthController implements IController {
  constructor(@inject(TYPES.AuthService) private readonly authService: AuthService) {}

  router(): Router {
    const router: Router = Router();
    router.post('/signup', asyncWrapper(this.signUp));

    return router;
  }

  async signUp(req: Request, res: Response) {
    const { email, password } = req.body;

    const accessToken: string = await this.authService.signUp(email, password);

    return res.status(201).send({ accessToken });
  }
}
