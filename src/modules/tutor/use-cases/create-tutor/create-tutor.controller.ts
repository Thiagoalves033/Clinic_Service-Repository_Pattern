import { NextFunction, Request, Response } from 'express';
import { CreateTutorRequestDto } from './create-tutor.request.dto';
import { CreateTutorResponseDto } from './create-tutor.response.dto';
import { CreateTutorService } from './create-tutor.service';

export class CreateTutorHttpController {
  constructor(private readonly service: CreateTutorService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedRequest = new CreateTutorRequestDto({ ...req.body });

      await this.service.execute(parsedRequest);

      res
        .status(201)
        .json({ tutor: new CreateTutorResponseDto(parsedRequest.getProperties()).getProperties() });
    } catch (error) {
      next(error);
    }
  };
}
