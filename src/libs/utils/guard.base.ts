import { ArgumentNotProvidedException, ArgumentOutOfRangeException } from '@libs/exceptions';

export abstract class Guard {
  public static AgainstNullOrUndefined(value: unknown, parameterName: string): void {
    if (value === null || value === undefined) {
      throw new ArgumentNotProvidedException(`The parameter '${parameterName}' cannot be empty.`);
    }
  }

  public static AgainstWrongLength(
    value: number | string,
    min: number,
    max: number,
    parameterName: string
  ): void {
    const valueLength = typeof value === 'number' ? value.toString().length : value.length;

    if (valueLength > max || valueLength < min) {
      throw new ArgumentOutOfRangeException(
        `The parameter '${parameterName}' cannot be greater than ${max} nor less than ${min}.`
      );
    }
  }
}
