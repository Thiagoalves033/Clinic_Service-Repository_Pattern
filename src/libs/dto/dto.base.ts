import { z, ZodError, ZodType } from 'zod';
import { ObjectLiteral } from '../types/object-literal.type';
import { ValidationException } from './dto.validation.exception';

export abstract class BaseDto<Schema extends ZodType> {
  protected object: z.infer<Schema> | undefined;

  constructor(data: ObjectLiteral) {
    this.validate(data);
  }

  protected abstract schema(): Schema;

  private validate(data: ObjectLiteral) {
    try {
      this.object = this.schema().parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      }

      throw error;
    }
  }

  getProperties(): z.infer<Schema> {
    return this.object;
  }
}