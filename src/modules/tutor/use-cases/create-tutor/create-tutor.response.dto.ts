import { BaseDto } from '@src/libs/dto';
import z from 'zod';

export const createTutorRequestSchema = z.object({
  name: z.string().min(1).max(70),
  email: z.string().min(1).max(256).email()
});

export class CreateTutorResponseDto extends BaseDto<typeof createTutorRequestSchema> {
  protected schema() {
    return createTutorRequestSchema;
  }
}
