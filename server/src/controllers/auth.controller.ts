import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { OAuth2Client } from 'google-auth-library';
import { getAuthorization } from '@/middlewares/auth.middleware';
import { IAuthRequest } from '@/interfaces/authRequest.interface';

const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'postmessage');

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.auth.signup(userData);
      console.warn('here');

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const { cookie, findUser } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public google = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code }: { code: string } = req.body;
      const { tokens } = await oAuth2Client.getToken(code); // exchange code for tokens

      const ticket = await oAuth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.CLIENT_ID,
      });

      const { family_name, given_name, picture, sub, email } = ticket.getPayload();

      const { cookie, user } = await this.auth.googleLogin({ family_name, given_name, picture, sub, email });
      res.setHeader('Set-Cookie', [cookie]);

      res.status(200).json({ data: user, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public me = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const { user } = req;

      res.status(200).json({ data: user, message: 'me' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
