import { BaseEntity } from '@libs/utils/entity.base';
import { randomUUID } from 'crypto';
import { PetEntity } from './pet/pet.entity';
import { CreatePetProps } from './pet/pet.types';
import { Pets } from './pet/pets.list';
import {
  CreateTutorProps,
  TutorProps,
  UpdateTutorAddressProps,
  UpdateTutorContactProps,
  UpdateTutorNameProps
} from './tutor.types';
import { Address, AddressProps, Contact, ContactProps, Name } from './value-objects';

export class TutorEntity extends BaseEntity<TutorProps> {
  protected readonly id: string;

  constructor(id: string, props: TutorProps) {
    super({ id: id, props: props });
    this.id = id;
  }

  public static create(create: CreateTutorProps): TutorEntity {
    const id = randomUUID();
    const props = { ...create, pets: Pets.create() };
    return new TutorEntity(id, props);
  }

  public updateTutorName(update: UpdateTutorNameProps): void {
    this.props.name = new Name(update);
    this.setUpdatedAt();
  }

  public updateTutorContact(update: UpdateTutorContactProps): void {
    const newTutorContact = new Contact({
      ...this.props.contact.getContact(),
      ...update
    } as ContactProps);

    this.props.contact = newTutorContact;
    this.setUpdatedAt();
  }

  public updateTutorAddress(update: UpdateTutorAddressProps): void {
    const newTutorAddress = new Address({
      ...this.props.address.getAddress(),
      ...update
    } as AddressProps);

    this.props.address = newTutorAddress;
    this.setUpdatedAt();
  }

  getName() {
    return this.props.name.getName();
  }

  public getContact() {
    return this.props.contact.getContact();
  }

  public getAddress() {
    return this.props.address.getAddress();
  }

  public getPets() {
    return this.props.pets.getItems();
  }

  public addPet(pet: CreatePetProps): void {
    const newPet = PetEntity.create(pet);
    this.props.pets.add(newPet);
  }

  public removePet(pet: PetEntity): void {
    this.props.pets.remove(pet);
  }
}
