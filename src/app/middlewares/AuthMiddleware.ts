import { NextFunction, Request, Response } from 'express';
import Auth from '../utils/Auth';

const authenticateMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers.authorization || '';
  const tokenGenerator = new Auth();
  tokenGenerator.authenticateToken(token);

  next();
};

export default authenticateMiddleware;
