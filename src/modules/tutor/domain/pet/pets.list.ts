import { BaseList } from '@libs/utils/list.base';
import { PetEntity } from './pet.entity';

export class Pets extends BaseList<PetEntity> {
  compareItems(firstItem: PetEntity, secondItem: PetEntity): boolean {
    return firstItem.equals(secondItem);
  }

  public static create(pets?: PetEntity[]): Pets {
    return new Pets(pets || []);
  }
}
