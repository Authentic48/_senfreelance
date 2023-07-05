import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { JwtService } from '../../services/jwt.service';
import { PasswordService } from '../../services/password.service';
import { AuthController } from '../../controllers/auth.controller';

const container = new Container();

// Services
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<JwtService>(TYPES.JwtService).to(JwtService).inSingletonScope();
container.bind<PasswordService>(TYPES.PasswordService).to(PasswordService).inSingletonScope();
container.bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();

// Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();
export default container;
