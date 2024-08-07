import { ConflictException } from '@src/libs/exceptions';
import { TutorEntity } from '@modules/tutor/domain/tutor.entity';
import { TutorAlreadyExistsException } from '@modules/tutor/domain/tutor.errors';
import { Address, BirthDate, Contact, Name } from '@modules/tutor/domain/value-objects';
import { TutorRepository } from '@modules/tutor/storage/tutor.repository';
import { CreateTutorRequestDto } from './create-tutor.request.dto';

export class CreateTutorService {
  constructor(private readonly tutorRepo: TutorRepository) {}

  async execute(props: CreateTutorRequestDto): Promise<TutorEntity | TutorAlreadyExistsException> {
    const createTutor = props.getProperties();

    const name: Name = new Name({ name: createTutor.name });

    const date_of_birth: BirthDate = new BirthDate({ date_of_birth: createTutor.date_of_birth });
    const contact: Contact = new Contact({
      email: createTutor.email,
      phone_number: createTutor.phone_number
    });

    const address: Address = new Address({
      state: createTutor.state,
      city: createTutor.city,
      zip_code: createTutor.zip_code
    });

    const tutor = TutorEntity.create({
      name: name,
      date_of_birth: date_of_birth,
      contact: contact,
      address: address
    });

    try {
      await this.tutorRepo.insertTutor(tutor);
      return tutor;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new TutorAlreadyExistsException(error);
      }

      throw error;
    }
  }
}
