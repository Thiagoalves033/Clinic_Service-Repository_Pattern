import { TutorEntity } from '../domain/tutor.entity';

export interface ITutorRepository {
  insertTutor(tutor: TutorEntity): Promise<void>;
}
