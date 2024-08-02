import { ArgumentInvalidException } from '@src/libs/exceptions';
import { Guard } from '@src/libs/utils/guard.base';
import { BaseValueObject } from '@src/libs/utils/value-object.base';

export interface AddressProps {
  state: string;
  city: string;
  zip_code: string;
}

export class Address extends BaseValueObject<AddressProps> {
  getAddress() {
    return this.props;
  }

  protected validate(props: AddressProps): void {
    Guard.AgainstNullOrUndefined(props.city, 'city');
    Guard.AgainstNullOrUndefined(props.state, 'state');
    Guard.AgainstNullOrUndefined(props.zip_code, 'zip_code');

    Guard.AgainstWrongLength(props.city, 3, 30, 'city');
    Guard.AgainstWrongLength(props.state, 2, 30, 'state');
    Guard.AgainstWrongLength(props.zip_code, 1, 15, 'zip_code');

    if (!/^[a-z0-9]+$/i.exec(props.zip_code)) {
      throw new ArgumentInvalidException('Zip Code provided is not valid');
    }
  }
}
