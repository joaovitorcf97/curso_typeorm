import dotenv from 'dotenv';
import Jwt, { SignOptions } from 'jsonwebtoken';
import { ITokenData } from '../interfaces/ILogin';
import ErrorExtension from './ErrorExtension';

dotenv.config();

const secret = process.env.JWT_SECRET as string;

const jwtDefaultConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1h',
};

class Auth {
  constructor(private jwtConfig?: SignOptions) {
    if (!this.jwtConfig) {
      this.jwtConfig = jwtDefaultConfig;
    }
  }

  public jwtGenerator(payload: ITokenData): string {
    return Jwt.sign(payload, secret, this.jwtConfig);
  }

  public authenticateToken(token: string) {
    if (!token) {
      throw new ErrorExtension(401, 'Token not found!');
    }

    try {
      const validateJwt = Jwt.verify(token, secret, this.jwtConfig);

      return validateJwt;
    } catch (error) {
      console.log(error);
      throw new ErrorExtension(401, 'Invalid token!');
    }
  }
}

export default Auth;
