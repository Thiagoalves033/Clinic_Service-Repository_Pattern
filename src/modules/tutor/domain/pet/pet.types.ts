import { PetName } from './value-objects/pet-name.value-object';
import { PhysicalInformation } from './value-objects/physical-information.value-object';
import { Species } from './value-objects/species.value-object';

export interface PetProps {
  pet_name: PetName;
  species: Species;
  size: PetSize;
  physical: PhysicalInformation;
}

export interface CreatePetProps {
  pet_name: PetName;
  species: Species;
  physical: PhysicalInformation;
}

export interface UpdatePhysicalInformationProps {
  weight?: number;
  age?: number;
}

export enum PetSize {
  small = 'Small',
  medium = 'Medium',
  large = 'Large'
}
