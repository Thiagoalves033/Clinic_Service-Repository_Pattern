import { Mapper } from '@src/libs/ports/mapper.port';
import { TutorEntity } from './domain/tutor.entity';
import { TutorModel, tutorSchema } from './storage/tutor.repository';

export class TutorMapper implements Mapper<TutorEntity, TutorModel> {
  toPersistence(entity: TutorEntity): TutorModel {
    const entityCopy = entity.getProps();

    const record: TutorModel = {
      id: entityCopy.id,
      createdAt: entityCopy.createdAt,
      updatedAt: entityCopy.updatedAt,
      name: entityCopy.name.getName(),
      date_of_birth: entityCopy.date_of_birth.getBirthDate(),
      email: entityCopy.contact.getContact().email,
      phone_number: entityCopy.contact.getContact().phone_number,
      state: entityCopy.address.getAddress().state,
      city: entityCopy.address.getAddress().city,
      zip_code: entityCopy.address.getAddress().zip_code
    };

    return tutorSchema.parse(record);
  }
}
