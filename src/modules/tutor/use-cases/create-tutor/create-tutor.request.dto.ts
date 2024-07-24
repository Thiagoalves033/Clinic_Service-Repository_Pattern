import { BaseDto } from '@src/libs/dto';
import z from 'zod';

export const createTutorResponseSchema = z.object({
  name: z.string().min(1).max(70),
  phone_number: z.string().min(1).max(15),
  email: z.string().min(1).max(256).email(),
  date_of_birth: z.coerce.date(),
  zip_code: z.string().min(1).max(15)
});

export class CreateTutorRequestDto extends BaseDto<typeof createTutorResponseSchema> {
  protected schema() {
    return createTutorResponseSchema;
  }
}
