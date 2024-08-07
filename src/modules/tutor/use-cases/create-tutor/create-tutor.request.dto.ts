import { BaseDto } from '@src/libs/dto';
import z from 'zod';

export const createTutorRequestSchema = z.object({
  name: z.string().min(1).max(70),
  date_of_birth: z.coerce.date(),
  email: z.string().min(1).max(256).email(),
  phone_number: z.string().min(1).max(15),
  state: z.string().min(2).max(30),
  city: z.string().min(2).max(30),
  zip_code: z.string().min(1).max(15)
});

export class CreateTutorRequestDto extends BaseDto<typeof createTutorRequestSchema> {
  protected schema() {
    return createTutorRequestSchema;
  }
}
