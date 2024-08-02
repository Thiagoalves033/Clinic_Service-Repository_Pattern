import { ArgumentInvalidException } from '@src/libs/exceptions';
import { Guard } from '@src/libs/utils/guard.base';
import { BaseValueObject } from '@src/libs/utils/value-object.base';

export interface ContactProps {
  email: string;
  phone_number: string;
}

export class Contact extends BaseValueObject<ContactProps> {
  getContact() {
    return this.props;
  }

  protected validate(props: ContactProps): void {
    Guard.AgainstNullOrUndefined(props.email, 'email');
    Guard.AgainstNullOrUndefined(props.phone_number, 'phone number');

    Guard.AgainstWrongLength(props.email, 3, 256, 'email');
    Guard.AgainstWrongLength(props.phone_number, 7, 15, 'phone_number');

    if (
      !/^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(.+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(
        props.email
      )
    ) {
      throw new ArgumentInvalidException('Email provided is not valid');
    }

    if (isNaN(Number(props.phone_number))) {
      throw new ArgumentInvalidException('Phone Number provided is not valid');
    }
  }
}
