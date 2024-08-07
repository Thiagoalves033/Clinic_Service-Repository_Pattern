import { Guard } from '@src/libs/utils/guard.base';
import { BaseValueObject } from '@src/libs/utils/value-object.base';

export interface NameProps {
  name: string;
}

export class Name extends BaseValueObject<NameProps> {
  getName() {
    return this.props.name;
  }

  protected validate(props: NameProps): void {
    Guard.AgainstNullOrUndefined(props.name, 'name');
    Guard.AgainstWrongLength(props.name, 3, 70, 'name');
  }
}
