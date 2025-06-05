import { NewPatient, Diagnosis, Patient } from '../types';
import Man2Icon from '@mui/icons-material/Man2';
import WomanIcon from '@mui/icons-material/Woman';
import { Stack, Typography } from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { Entry, OccupationalHealthcareEntry, HealthCheckRating} from '../types';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
const patientGenderIcon = (gender: NewPatient["gender"]) => {
  switch (gender) {
    case "female":
      return <WomanIcon />;
    case "male":
      return <Man2Icon />;
    case "other":
      return <AccessibleIcon />;
    default:
      return null;
  }
};
interface Props {
  patient : Patient | null | undefined
  diagnoses: Diagnosis[]
}

const assertNever = (value: never)=> {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
const healthCheckIcon = (health: HealthCheckRating) => {
  switch (health) {
    case 0:
      return <FavoriteIcon style={{ color: 'green' }} />;
    case 1:
      return <FavoriteIcon style={{ color: 'yellow' }} />;
    case 2:
      return <FavoriteIcon style={{ color: 'orange' }} />;
    case 3:
      return <FavoriteIcon style={{ color: 'red' }} />;
  }
};
const EntryDetails = ({ entry }: { entry: Entry } ) => {
  switch(entry.type) {
    case "OccupationalHealthcare":
      return (
        <div>
        {entry.sickLeave ? 
          <p>SICK LEAVE: {entry.sickLeave?.startDate}-{entry.sickLeave?.endDate}</p>
          : null
        }
        </div>
      );
    case "Hospital":
      return (
        <div>
        DISCHARGE: {entry.discharge.date} - {entry.discharge.criteria}
        </div>
      );
    case "HealthCheck":
      return (
        <div>
        {healthCheckIcon(entry.healthCheckRating)}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const SinglePatientPage = ({ patient, diagnoses }: Props)=> {
  if (!patient) {
    console.log("Patient data is not available");
    return null;
  }
  console.log(patient.ssn);

  return (
    <div>
      <h2>
        {patient.name} {patientGenderIcon(patient.gender)}
      </h2>
      <p>ssn: {patient.ssn}</p>
      {patient.dateOfBirth && <p>date of birth: {patient.dateOfBirth}</p>}
      <p>occupation: {patient.occupation}</p>
      <div>
        <h3>Entries</h3>
        {patient.entries && patient.entries.map((entry: Entry) => (
          <div key={entry.id} style={{ border: '1px solid lightgrey', margin: '1em 0', padding: '0.5em' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body1" fontWeight="bold">
                {entry.date}
              </Typography>
              {entry.type === "OccupationalHealthcare" ?
                        entry.employerName ? 
                            <p>
                                 <WorkIcon/> {entry.employerName} 
                            </p> 
                            : <WorkIcon /> 
                        : <MedicalInformationIcon />
                    }
            </Stack>
            <p>{entry.description}</p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map(code => {
                  const diagnosis = diagnoses.find((e) => e.code === code);
                  return (
                    <li key={code}>
                      {code} {diagnosis ? `- ${diagnosis.name}` : 'No diagnosis found'}
                    </li>
                    
                  );
                  
                })}
              </ul>
            )}
            {EntryDetails({ entry })}
            diagnose by {entry.specialist}
          </div>
        ))}
      </div>
    </div>
  );
};


export default SinglePatientPage;
