import { Guard } from '@src/libs/utils/guard.base';
import { BaseValueObject } from '@src/libs/utils/value-object.base';

export interface SpeciesProps {
  species: string;
}

export class Species extends BaseValueObject<SpeciesProps> {
  getSpecies() {
    return this.props;
  }

  protected validate(props: SpeciesProps): void {
    Guard.AgainstNullOrUndefined(props.species, 'species');
    Guard.AgainstWrongLength(props.species, 3, 70, 'species');
  }
}
