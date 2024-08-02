import { Pets } from './pet/pets.list';
import { Address } from './value-objects/address.value-object';
import { BirthDate } from './value-objects/birth-date.value-object';
import { Contact } from './value-objects/contact.value-object';
import { Name } from './value-objects/name.value-object';

export interface TutorProps {
  name: Name;
  date_of_birth: BirthDate;
  contact: Contact;
  address: Address;
  pets: Pets;
}

export interface CreateTutorProps {
  name: Name;
  date_of_birth: BirthDate;
  contact: Contact;
  address: Address;
}

export interface UpdateTutorNameProps {
  name: string;
}

export interface UpdateTutorContactProps {
  email?: string;
  phone_number?: string;
}

export interface UpdateTutorAddressProps {
  state?: string;
  city?: string;
  zip_code?: string;
}
