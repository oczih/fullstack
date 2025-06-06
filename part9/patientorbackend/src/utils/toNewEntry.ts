import { z } from 'zod';
import { Diagnosis, HealthCheckRating } from '../types';


const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});


export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});


export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema
]);

export type NewEntry = z.infer<typeof EntrySchema>;


const BaseEntryWithIdSchema = BaseEntrySchema.extend({
  id: z.string()
});

const HealthCheckEntryWithIdSchema = BaseEntryWithIdSchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

const OccupationalHealthcareEntryWithIdSchema = BaseEntryWithIdSchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

const HospitalEntryWithIdSchema = BaseEntryWithIdSchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});


export const EntryWithIdSchema = z.discriminatedUnion("type", [
  HealthCheckEntryWithIdSchema,
  OccupationalHealthcareEntryWithIdSchema,
  HospitalEntryWithIdSchema
]);


export type EntryWithId = z.infer<typeof EntryWithIdSchema>;


export const toNewEntry = (object: unknown): NewEntry => {
  return EntrySchema.parse(object);
};


export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [];
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};
