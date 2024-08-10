import { ConflictException } from '@src/libs/exceptions';
import { TutorEntity } from '@src/modules/tutor/domain/tutor.entity';
import { CreateTutorRequestDto } from '@src/modules/tutor/use-cases/create-tutor/create-tutor.request.dto';
import { CreateTutorService } from '@src/modules/tutor/use-cases/create-tutor/create-tutor.service';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';

describe('CreateTutor Service', () => {
  const tutorRepoMock = {
    insertTutor: vi.fn()
  };

  const tutorRequestDTO = new CreateTutorRequestDto({
    name: 'Tutor',
    phone_number: '211111111',
    email: 'aaaa@example.com',
    date_of_birth: '2001-01-01',
    state: 'California',
    city: 'San Francisco',
    zip_code: '123123'
  });

  let service: CreateTutorService;
  let repoSpy: MockInstance;

  beforeEach(() => {
    service = new CreateTutorService(tutorRepoMock);
    repoSpy = vi.spyOn(tutorRepoMock, 'insertTutor');
  });

  it('Should correctly return a tutor entity ', async () => {
    const tutor = await service.execute(tutorRequestDTO);

    expect(TutorEntity.isEntity(tutor)).toEqual(true);
    expect(repoSpy).toHaveBeenCalledOnce();
    expect(repoSpy).toBeCalledWith(tutor);
  });

  it('Should throw an error if tutor already exists', () => {
    tutorRepoMock.insertTutor.mockImplementationOnce(() => {
      throw new ConflictException('Record already exists');
    });

    expect(() => service.execute(tutorRequestDTO)).rejects.toThrowError('exists');
  });

  it('Should throw an error if unspecified error is thrown', () => {
    tutorRepoMock.insertTutor.mockImplementationOnce(() => {
      throw new Error();
    });

    expect(() => service.execute(tutorRequestDTO)).rejects.toThrowError();
  });
});
