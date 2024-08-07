import { BaseEntity } from '../utils/entity.base';

export interface Mapper<DomainEntity extends BaseEntity<any>, DbRecord> {
  toPersistence(entity: DomainEntity): DbRecord;
}
