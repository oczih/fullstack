import { z } from 'zod';

export const NewDiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const toNewPatientEntry = (object: unknown): z.infer<typeof NewPatientSchema> => {
    return NewPatientSchema.parse(object);
  };
