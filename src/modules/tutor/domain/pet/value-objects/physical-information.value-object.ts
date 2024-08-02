import { ArgumentInvalidException } from '@src/libs/exceptions';
import { Guard } from '@src/libs/utils/guard.base';
import { BaseValueObject } from '@src/libs/utils/value-object.base';

export interface PhysicalInformationProps {
  weight: number;
  age: number;
}

export class PhysicalInformation extends BaseValueObject<PhysicalInformationProps> {
  getPhysicalInfo() {
    return this.props;
  }

  protected validate(props: PhysicalInformationProps): void {
    Guard.AgainstNullOrUndefined(props.weight, 'weight');
    Guard.AgainstNullOrUndefined(props.age, 'age');

    if (props.weight < 0) {
      throw new ArgumentInvalidException('Weight provided is not valid');
    }

    if (props.age < 0 || props.age > 50) {
      throw new ArgumentInvalidException('Age provided is not valid');
    }
  }
}
