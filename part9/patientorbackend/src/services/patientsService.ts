import patients from '../../data/patients';
import { PatientPreview } from '../types';


const getEntries = (): PatientPreview[] => {
    return patients.map(({ ssn: _ssn, ...preview }) => preview);
};

export default {
    getEntries
};




