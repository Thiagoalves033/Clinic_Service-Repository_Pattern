import { ValidationException } from '@libs/dto/dto.validation.exception';
import { NextFunction, Request, Response } from 'express';
import { ExceptionBase } from '../exceptions';

export function errorHandler(
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
): Response {
  if (error instanceof ExceptionBase) {
    return response.status(error.statusCode).json({
      code: error.code,
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
      cause: error.cause || 'Unknown'
    });
  }

  if (error instanceof ValidationException) {
    return response.status(400).json({ error });
  }

  return response.status(500).json({
    code: error.code,
    error: error.name,
    message: error.message,
    cause: error.cause || 'Unknown'
  });
}
