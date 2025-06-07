import { NewPatient, Diagnosis, Patient} from '../types';
import Man2Icon from '@mui/icons-material/Man2';
import WomanIcon from '@mui/icons-material/Woman';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { Entry, HealthCheckRating} from '../types';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { Box, Paper, Typography } from '@mui/material';
import { NewHealthCheckEntry } from './NewHealthCheckEntry';
import React, { useState } from 'react';

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
export interface Props {
  patient : Patient | null | undefined
  diagnoses: Diagnosis[]
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
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
  const [entries, setEntries] = useState<Entry[]>(patient?.entries ?? []);

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
      <NewHealthCheckEntry
        patient={patient}
        entries={entries}
        setEntries={setEntries}
      />
      <div>
        <h3>Entries</h3>
        {entries && entries.map((entry: Entry) => (
          <Paper
            key={entry.id}
            elevation={3}
            sx={{ p: 2, my: 2, backgroundColor: '#f9f9f9' }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h6">{entry.date}</Typography>
              {entry.type === "OccupationalHealthcare" && entry.employerName ? (
                <>
                  <WorkIcon />
                  <Typography>{entry.employerName}</Typography>
                </>
              ) : (
                <MedicalInformationIcon />
              )}
            </Box>
            <Typography>{entry.description}</Typography>

            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses.find((e) => e.code === code);
                  return (
                    <li key={code}>
                      <Typography variant="body2">
                        {code} {diagnosis ? `- ${diagnosis.name}` : ''}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            )}

            {EntryDetails({ entry })}

            <Typography fontStyle="italic">
              diagnosed by {entry.specialist}
            </Typography>
          </Paper>
        ))}
      </div>
    </div>
  );
};


export default SinglePatientPage;
