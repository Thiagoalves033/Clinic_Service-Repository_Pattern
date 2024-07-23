import { NextFunction, Request, Response } from 'express';
import { CreateTutorService } from './create-tutor.service';
import { CreateTutorRequestDto } from './create-tutor.request.dto';
import { CreateTutorResponseDto } from './create-tutor.response.dto';

export class CreateTutorHttpController {
  constructor(private readonly service: CreateTutorService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedRequest = new CreateTutorRequestDto({ ...req.body });

      await this.service.execute(parsedRequest.getProperties());

      res
        .status(200)
        .json({ tutor: new CreateTutorResponseDto(parsedRequest.getProperties()).getProperties() });
    } catch (error) {
      next(error);
    }
  };
}
