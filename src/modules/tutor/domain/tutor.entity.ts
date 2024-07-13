import { randomUUID } from 'crypto';
import { ChangeTutorInformationProps, CreateTutorProps } from './tutor.types';
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  ArgumentOutOfRangeException
} from '../../../libs/exceptions';

export class TutorEntity {
  private readonly id: string;
  private name: string;
  private phone_number: string;
  private email: string;
  private readonly date_of_birth: Date;
  private zip_code: string;

  constructor(id: string, props: CreateTutorProps) {
    this.id = id;
    this.name = props.name;
    this.phone_number = props.phone_number;
    this.email = props.email;
    this.date_of_birth = props.date_of_birth;
    this.zip_code = props.zip_code;
  }

  public static create(create: CreateTutorProps): TutorEntity {
    const id = randomUUID();

    TutorEntity.ValidateName(create.name);
    TutorEntity.ValidatePhoneNumber(create.phone_number);
    TutorEntity.ValidateEmail(create.email);
    TutorEntity.ValidateDateOfBirth(create.date_of_birth);
    TutorEntity.ValidateZipCode(create.zip_code);

    return new TutorEntity(id, create);
  }

  private ChangeTutorInformation(update: ChangeTutorInformationProps): void {
    if (update.name) {
      TutorEntity.ValidateName(update.name);
      this.name = update.name;
    }

    if (update.phone_number) {
      TutorEntity.ValidatePhoneNumber(update.phone_number);
      this.phone_number = update.phone_number;
    }

    if (update.email) {
      TutorEntity.ValidateEmail(update.email);
      this.email = update.email;
    }

    if (update.zip_code) {
      TutorEntity.ValidateZipCode(update.zip_code);
      this.zip_code = update.zip_code;
    }
  }

  private static ValidateName(name: string): void {
    if (name == null) {
      throw new ArgumentNotProvidedException('Name cannot be empty');
    }

    if (name.length > 100) {
      throw new ArgumentOutOfRangeException('Name cannot be over 100 characters');
    }
  }

  private static ValidatePhoneNumber(phone_number: string): void {
    if (phone_number == null) {
      throw new ArgumentNotProvidedException('Phone Number cannot be empty');
    }

    if (phone_number.length > 30) {
      throw new ArgumentOutOfRangeException('Phone Number cannot be over 30 characters');
    }

    if (isNaN(Number(phone_number))) {
      throw new ArgumentInvalidException('Phone Number provided is not valid');
    }
  }

  private static ValidateEmail(email: string): void {
    if (email == null) {
      throw new ArgumentNotProvidedException('Email cannot be empty');
    }

    if (email.length > 50) {
      throw new ArgumentOutOfRangeException('Email cannot be over 50 characters');
    }

    if (
      !/^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(.+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(
        email
      )
    ) {
      throw new ArgumentInvalidException('Email provided is not valid');
    }
  }

  private static ValidateZipCode(zip_code: string): void {
    if (zip_code == null) {
      throw new ArgumentNotProvidedException('Zip Code cannot be empty');
    }

    if (zip_code.length > 10) {
      throw new ArgumentOutOfRangeException('Zip Code cannot be over 30 characters');
    }

    if (!/^[a-z0-9]+$/i.exec(zip_code)) {
      throw new ArgumentInvalidException('Zip Code provided is not valid');
    }
  }

  private static ValidateDateOfBirth(date_of_birth: Date): void {
    if (date_of_birth == null) {
      throw new ArgumentNotProvidedException('Date cannot be empty');
    }

    if (new Date(date_of_birth) > new Date(Date.now())) {
      throw new ArgumentInvalidException('Date provided is not valid');
    }
  }
}
