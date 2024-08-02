import { Guard } from '@src/libs/utils/guard.base';
import { BaseValueObject } from '@src/libs/utils/value-object.base';

export interface PetNameProps {
  pet_name: string;
}

export class PetName extends BaseValueObject<PetNameProps> {
  getPetName() {
    return this.props;
  }

  protected validate(props: PetNameProps): void {
    Guard.AgainstNullOrUndefined(props.pet_name, 'pet name');
    Guard.AgainstWrongLength(props.pet_name, 2, 50, 'pet name');
  }
}
