import { injectable, inject } from 'inversify';
import { User } from '../models/user-model';
import { PasswordService } from './password.service';
import { TYPES } from '../config/ioc/types';

@injectable()
export class UserService {
  constructor(@inject(TYPES.PasswordService) private readonly passwordService: PasswordService) {}
  async createUser(email: string, password: string) {
    const hashedPassword: string = await this.passwordService.hash(password);
    const { roles, id } = await User.create({
      email,
      password: hashedPassword,
    });

    return { id, roles };
  }

  async findUserByEmail(email: string) {
    return User.findOne({
      email,
    });
  }
}
