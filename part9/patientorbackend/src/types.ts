export type Diagnosis = {
    "code": string;
    "name": string;
    "latin"?: string;
};
export enum Gender {
    Male = 'male',
    Female =  'female',
    Other = 'other'
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
};
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
};
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
};
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
};
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
};
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export type NewPatient = Omit<Patient, 'id'>;
export type PatientPreview = Omit<Patient, "ssn" >;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;