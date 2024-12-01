export abstract class ExceptionBase extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;

  constructor(
    readonly message: string,
    readonly cause?: Error
  ) {
    super(message);
  }
}
