import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { TokenPayload } from 'google-auth-library';

const createToken = (userId: string): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: userId };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => `Authorization=${tokenData.token}; HttpOnly; SameSite="Lax"; Max-Age=${tokenData.expiresIn};`;

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: User): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    if (!findUser.password) throw new HttpException(409, 'User logged in with external services');
    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = createToken(findUser?._id);
    const cookie = createCookie(tokenData);

    return { cookie, findUser };
  }

  public async googleLogin({ family_name, given_name, picture, sub, email }: Partial<TokenPayload>): Promise<{ cookie: string; user: User }> {
    try {
      const findUser: User = await UserModel.findOne({ email });

      let user: User = {} as User;

      if (!findUser) {
        const createUserData: User = await UserModel.create({
          email,
          googleId: sub,
          name: given_name,
          surname: family_name,
          picture,
        });
        user = createUserData;
      } else {
        user = findUser;
      }

      const tokenData = createToken(user?._id);
      const cookie = createCookie(tokenData);
      return { cookie, user };
    } catch (e) {
      console.error(e);
    }
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }
}
