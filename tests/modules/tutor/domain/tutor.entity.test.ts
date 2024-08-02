import { PetEntity } from '@src/modules/tutor/domain/pet/pet.entity';
import { CreatePetProps } from '@src/modules/tutor/domain/pet/pet.types';
import { Pets } from '@src/modules/tutor/domain/pet/pets.list';
import { PetName } from '@src/modules/tutor/domain/pet/value-objects/pet-name.value-object';
import { PhysicalInformation } from '@src/modules/tutor/domain/pet/value-objects/physical-information.value-object';
import { Species } from '@src/modules/tutor/domain/pet/value-objects/species.value-object';
import { TutorEntity } from '@src/modules/tutor/domain/tutor.entity';
import { TutorProps } from '@src/modules/tutor/domain/tutor.types';
import { Address, BirthDate, Contact, Name } from '@src/modules/tutor/domain/value-objects';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Tutor Entity', () => {
  const tutorProps: TutorProps = {
    name: new Name({ name: 'John Doe' }),
    date_of_birth: new BirthDate({ date_of_birth: new Date('2000-01-01') }),
    contact: new Contact({
      phone_number: '123456789012345',
      email: 'jh@johndoe.com'
    }),
    address: new Address({
      state: 'California',
      city: 'San Francisco',
      zip_code: '12345678'
    }),
    pets: Pets.create()
  };

  const petProps: CreatePetProps = {
    pet_name: new PetName({ pet_name: 'Rex' }),
    species: new Species({ species: 'Dog' }),
    physical: new PhysicalInformation({
      weight: 21,
      age: 4
    })
  };

  let tutor: TutorEntity;
  let firstPet: PetEntity;

  beforeEach(() => {
    tutor = TutorEntity.create(tutorProps);
  });

  it('Should create a valid Tutor with no pets', () => {
    expect(TutorEntity.isEntity(tutor)).toEqual(true);
    expect(tutor.getPets()).toEqual([]);
  });

  it('Should correctly add a new pet', () => {
    tutor.addPet(petProps);

    expect(tutor.getPets()).not.toEqual([]);
    expect(tutor.getPets().length).toEqual(1);
    expect(() => tutor.addPet(petProps)).toThrowError('added');
  });

  it('Should correctly remove a pet', () => {
    tutor.addPet(petProps);
    const petList = tutor.getPets();
    tutor.removePet(petList[0] as PetEntity);

    expect(tutor.getPets()).toEqual([]);
    expect(tutor.getPets().length).toEqual(0);
  });

  it('Should update tutor fields correctly', () => {
    tutor.updateTutorContact({ phone_number: '1234567890', email: 'jn@janedoe.com' });
    tutor.updateTutorAddress({ city: 'New York' });
    tutor.updateTutorName({ name: 'Jane Doe' });

    expect(tutor.getAddress()).toMatchObject({
      state: 'California',
      city: 'New York',
      zip_code: '12345678'
    });
    expect(tutor.getContact()).toMatchObject({
      phone_number: '1234567890',
      email: 'jn@janedoe.com'
    });
    expect(tutor.getName()).toMatchObject({
      name: 'Jane Doe'
    });
  });

  it('Should throw an error if fields are not valid', () => {
    expect(() => tutor.updateTutorContact({ phone_number: '1' })).toThrowError('greater');
    expect(() => tutor.updateTutorName({ name: null as unknown as string })).toThrowError('empty');
    expect(() => tutor.updateTutorAddress({ zip_code: '$$$' })).toThrowError('valid');
  });
});
