import { z } from 'zod';
import { Gender } from '../types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string(),
  entries: z.array(z.any()),
});

export const toNewPatientEntry = (object: unknown): z.infer<typeof NewPatientSchema> => {
    return NewPatientSchema.parse(object);
  };
