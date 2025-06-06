import patients from '../../data/patients';
import { NewPatient} from '../types';
import { v4 as uuid } from 'uuid';
import { Patient, Entry} from '../types';
import { NewEntry } from '../utils/toNewEntry';
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

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const id = uuid();
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    throw new Error('Patient not found');
  }

  const newEntry: Entry = {
    ...entry,
    id
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
    getEntries,
    addPatient,
    getPatientById,
    addEntry
};



