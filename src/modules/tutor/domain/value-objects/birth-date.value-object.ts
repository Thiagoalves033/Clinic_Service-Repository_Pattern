import { ArgumentInvalidException } from '@src/libs/exceptions';
import { Guard } from '@src/libs/utils/guard.base';
import { BaseValueObject } from '@src/libs/utils/value-object.base';

export interface BirthDateProps {
  date_of_birth: Date;
}

export class BirthDate extends BaseValueObject<BirthDateProps> {
  getBirthDate() {
    return this.props;
  }

  protected validate(props: BirthDateProps): void {
    Guard.AgainstNullOrUndefined(props.date_of_birth, 'date_of_birth');

    if (props.date_of_birth instanceof Date) {
      if (new Date(props.date_of_birth) > new Date(Date.now())) {
        throw new ArgumentInvalidException('Date provided is not valid');
      }
    }
  }
}
