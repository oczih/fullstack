import { z } from 'zod';
import { NewPatient, Gender } from '../types';

export const NewPatientSchema: z.ZodType<NewPatient> = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string(),
  entries: z.array(z.any()),
});

export const toNewPatientEntry = (object: unknown): NewPatient => {
    return NewPatientSchema.parse(object);
  };
