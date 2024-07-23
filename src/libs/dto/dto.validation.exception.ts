import { ZodError, ZodIssue } from 'zod';

export class ValidationException {
  private readonly issues: ZodIssue[];

  constructor(error: ZodError) {
    this.issues = error.issues;
  }
}
