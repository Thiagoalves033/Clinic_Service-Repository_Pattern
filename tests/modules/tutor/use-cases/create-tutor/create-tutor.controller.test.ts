import { CreateTutorHttpController } from '@src/modules/tutor/use-cases/create-tutor/create-tutor.controller';
import { CreateTutorService } from '@src/modules/tutor/use-cases/create-tutor/create-tutor.service';
import { Request, Response } from 'express';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('CreateTutor HTTP Controller', () => {
  const tutorRepoMock = {
    insertTutor: vi.fn()
  };

  const mockRequest = {
    body: {
      name: 'Tutor',
      phone_number: '211111111',
      email: 'tutor@example.com',
      date_of_birth: '2001-01-01',
      state: 'California',
      city: 'San Francisco',
      zip_code: '123123'
    }
  } as Request;

  const mockResponse = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  } as unknown as Response;

  const next = vi.fn();

  const serviceSpy = vi.spyOn(CreateTutorService.prototype, 'execute');
  let mockCreateTutorService: CreateTutorService;

  beforeEach(() => {
    mockCreateTutorService = new CreateTutorService(tutorRepoMock);
  });

  it('Should correctly handle a valid request', async () => {
    const createTutorController = new CreateTutorHttpController(mockCreateTutorService);
    await createTutorController.handle(mockRequest, mockResponse, next);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      tutor: {
        name: 'Tutor',
        email: 'tutor@example.com'
      }
    });
  });

  it('Should pass an invalid request to be handled in the next middleware', async () => {
    serviceSpy.mockImplementationOnce(() => {
      throw Error();
    });

    const createTutorController = new CreateTutorHttpController(mockCreateTutorService);
    await createTutorController.handle(mockRequest, mockResponse, next);

    expect(next).toBeCalled();
  });
});
