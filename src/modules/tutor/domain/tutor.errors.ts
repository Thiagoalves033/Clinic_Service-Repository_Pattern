import { ExceptionBase } from '@src/libs/exceptions';
import { StatusCodes } from 'http-status-codes';

export class TutorAlreadyExistsException extends ExceptionBase {
  static readonly message = 'Tutor already exists';
  readonly code = 'TUTOR.ALREADY_EXISTS';
  readonly statusCode = StatusCodes.CONFLICT;

  constructor(readonly cause?: Error) {
    super(TutorAlreadyExistsException.message, cause);
  }
}
