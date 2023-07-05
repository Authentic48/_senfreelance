import { injectable } from 'inversify';
import bcrypt from 'bcryptjs';

@injectable()
export class PasswordService {
  async hash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async compare(suppliedPassword: string, storePassword: string) {
    return await bcrypt.compare(suppliedPassword, storePassword);
  }
}
