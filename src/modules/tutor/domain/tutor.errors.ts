import { ExceptionBase } from '@src/libs/exceptions';

export class TutorAlreadyExistsException extends ExceptionBase {
  static readonly message = 'Tutor already exists';
  readonly code = 'TUTOR_ALREADY_EXISTS';

  constructor(readonly cause?: Error) {
    super(TutorAlreadyExistsException.message, cause);
  }
}
