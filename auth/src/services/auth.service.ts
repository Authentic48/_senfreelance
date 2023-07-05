import { injectable, inject } from 'inversify';
import { UserService } from './user.service';
import { NotAuthorizedError } from '@senefreelance/common';
import { JwtService } from './jwt.service';
import { TYPES } from '../config/ioc/types';

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.JwtService) private readonly jwtService: JwtService,
  ) {}
  async signUp(email: string, password: string): Promise<string> {
    const existingUser = await this.userService.findUserByEmail(email);

    console.log(existingUser);

    if (!!existingUser) throw new NotAuthorizedError();

    const newUser = await this.userService.createUser(email, password);

    return this.jwtService.sign({ id: newUser.id, roles: newUser.roles });
  }
}
