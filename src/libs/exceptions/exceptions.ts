import { StatusCodes } from 'http-status-codes';
import { ExceptionBase } from './exception.base';
import {
  ARGUMENT_INVALID,
  ARGUMENT_NOT_PROVIDED,
  ARGUMENT_OUT_OF_RANGE,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND
} from './exception.codes';

export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ARGUMENT_INVALID;
  readonly statusCode = StatusCodes.BAD_REQUEST;
}

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ARGUMENT_NOT_PROVIDED;
  readonly statusCode = StatusCodes.BAD_REQUEST;
}

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ARGUMENT_OUT_OF_RANGE;
  readonly statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
}

export class NotFoundException extends ExceptionBase {
  readonly code = NOT_FOUND;
  readonly statusCode = StatusCodes.NOT_FOUND;
}

export class ConflictException extends ExceptionBase {
  readonly code = CONFLICT;
  readonly statusCode = StatusCodes.CONFLICT;
}

export class InternalServerErrorException extends ExceptionBase {
  readonly code = INTERNAL_SERVER_ERROR;
  readonly statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
}
