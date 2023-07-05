import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';

// TODO: improve later

@injectable()
export class JwtService {
  async sign(payload: Record<string, any>) {
    return jwt.sign(payload, process.env.SECRET_KEY!);
  }
  async verify(token: string) {
    return jwt.verify(token, process.env.SECRET_KEY!);
  }
}
