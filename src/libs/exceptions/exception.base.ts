export abstract class ExceptionBase extends Error {
  abstract readonly code: string;

  constructor(
    readonly message: string,
    readonly cause?: Error
  ) {
    super(message);
  }
}
