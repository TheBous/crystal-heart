import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, ValidationMiddleware(CreateUserDto), this.auth.signUp);
    this.router.post(`${this.path}/login`, ValidationMiddleware(LoginUserDto), this.auth.logIn);
    this.router.post(`${this.path}/google`, this.auth.google);
    this.router.get(`${this.path}/me`, AuthMiddleware, this.auth.me);
    // this.router.post(`${this.path}google/refresh-token`, this.auth.googleRefreshToken);
    this.router.post(`${this.path}/logout`, AuthMiddleware, this.auth.logOut);
  }
}
