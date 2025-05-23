import patients from '../../data/patients';
import { PatientPreview, NewPatient } from '../types';
import { v4 as uuid } from 'uuid';
import { Gender } from '../types';

const getEntries = (): PatientPreview[] => {
    return patients.map(({ ssn: _ssn, gender, ...rest }) => ({
        ...rest,
        gender: gender as Gender
    }));
};

const addPatient = (entry: NewPatient): PatientPreview  => {
    const id = uuid();
    const newPatiententry = {
        id,
        ...entry
    };
    patients.push(newPatiententry);
    return newPatiententry;
};
export default {
    getEntries,
    addPatient
};




