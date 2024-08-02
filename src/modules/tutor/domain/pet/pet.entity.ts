import { BaseEntity } from '@src/libs/utils/entity.base';
import { randomUUID } from 'crypto';
import { CreatePetProps, PetProps, PetSize, UpdatePhysicalInformationProps } from './pet.types';
import {
  PhysicalInformation,
  PhysicalInformationProps
} from './value-objects/physical-information.value-object';

export class PetEntity extends BaseEntity<PetProps> {
  protected id: string;

  constructor(id: string, props: PetProps) {
    super({ id: id, props: props });
    this.id = id;
  }

  public static create(props: CreatePetProps): PetEntity {
    const id = randomUUID();
    const pet = { ...props, size: PetSize.small };

    return new PetEntity(id, pet);
  }

  updatePhysicalInformation(update: UpdatePhysicalInformationProps) {
    const newPetPshysicalInformation = new PhysicalInformation({
      ...this.props.physical,
      ...update
    } as PhysicalInformationProps);

    this.props.physical = newPetPshysicalInformation;
  }

  makeSizeSmall() {
    this.props.size = PetSize.small;
  }

  makeSizeMedium() {
    this.props.size = PetSize.medium;
  }

  makeSizeLarge() {
    this.props.size = PetSize.large;
  }
}
