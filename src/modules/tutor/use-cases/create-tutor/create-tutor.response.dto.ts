import z from 'zod';
import { BaseDto } from '../../../../libs/dto/dto.base';

export const createTutorRequestSchema = z.object({
  name: z.string().min(1).max(70),
  email: z.string().min(1).max(256).email()
});

export class CreateTutorResponseDto extends BaseDto<typeof createTutorRequestSchema> {
  protected schema() {
    return createTutorRequestSchema;
  }
}
