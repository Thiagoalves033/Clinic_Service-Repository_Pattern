import { ConflictException } from '@src/libs/exceptions';
import { TutorEntity } from '@modules/tutor/domain/tutor.entity';
import { TutorAlreadyExistsException } from '@modules/tutor/domain/tutor.errors';
import { CreateTutorProps } from '@modules/tutor/domain/tutor.types';
import { TutorRepository } from '@modules/tutor/storage/tutor.repository';

export class CreateTutorService {
  constructor(private readonly tutorRepo: TutorRepository) {}

  async execute(props: CreateTutorProps): Promise<TutorEntity | TutorAlreadyExistsException> {
    const tutor = TutorEntity.create({
      name: props.name,
      phone_number: props.phone_number,
      email: props.email,
      date_of_birth: props.date_of_birth,
      zip_code: props.zip_code
    });

    try {
      await this.tutorRepo.insert(tutor);
      return tutor;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new TutorAlreadyExistsException(error);
      }

      throw error;
    }
  }
}
