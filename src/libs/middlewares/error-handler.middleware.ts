import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../dto/dto.validation.exception';

export default function errorHandler(
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
): Response {
  if (error instanceof Error) {
    return response.status(400).json({
      status: 'error',
      message: error.message
    });
  }
  if (error instanceof ValidationException) {
    return response.status(400).json({ error });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
}
