import { NextFunction, Request, Response } from 'express';
import ErrorExtension from '../utils/ErrorExtension';

const httpErrorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const { status, message, errors } = error as ErrorExtension;

  response.status(status || 500).json({ message, errors });
};

export default httpErrorMiddleware;
