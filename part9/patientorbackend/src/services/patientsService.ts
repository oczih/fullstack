import patients from '../../data/patients';
import { NewPatient} from '../types';
import { v4 as uuid } from 'uuid';
import { Patient} from '../types';

const getEntries = (): Patient[] => {
  return patients.map(
    ({ id, name,ssn, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      ssn,
      occupation,
      dateOfBirth,
      gender,
      entries,
    }),
  );
};
const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return undefined;
  }

  const { id: pid, name,ssn, dateOfBirth, gender, occupation, entries } = patient;
  return {
    id: pid,
    name,
    ssn,
    dateOfBirth,
    gender,
    occupation,
    entries
  };
};
const addPatient = (entry: NewPatient): Patient => {
    const id: string = uuid();
    const newPatientEntry: Patient = {
        id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};
export default {
    getEntries,
    addPatient,
    getPatientById
};



