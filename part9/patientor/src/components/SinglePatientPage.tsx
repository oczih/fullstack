import { NewPatient, Diagnosis, Patient} from '../types';
import Man2Icon from '@mui/icons-material/Man2';
import WomanIcon from '@mui/icons-material/Woman';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { Entry, HealthCheckRating} from '../types';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import React, { useState } from 'react';
import patientsService from '../services/patients';
import { Button, TextField, Box, Paper, Typography } from '@mui/material';

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
const TogglableButton = ({
  onClick,
  isVisible,
}: {
  onClick: () => void;
  isVisible: boolean;
}) => {
  return (
    <Button type="button" onClick={onClick} >
      {isVisible ? 'Cancel' : 'Add New Entry'}
    </Button>
  );
};

const NewHealthCheckEntry = ({patient}: Props) => {
  const [formVisible, setFormVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const handleToggle = () => {
    setFormVisible(!formVisible);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!patient) {
      console.error("Patient is not defined");
      return;
    }

    patientsService.createEntry(patient.id, {
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
      type: "HealthCheck"
    }).then(data => {
      patient.entries = patient.entries.concat(data);
      console.log("New entry added:", data);
      setDescription('');
      setDate('');
      setSpecialist('');
      setDiagnosisCodes([]);
      setHealthCheckRating(0);
    });
  };
  return (
    <div>
      <TogglableButton onClick={handleToggle} isVisible={formVisible} />
    {formVisible && (
        <div>
          <h3>New HealthCheck Entry</h3>
          <form onSubmit={handleSubmit} style={{ border: '1px solid lightgrey', margin: '1em 0', padding: '0.5em' }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: '150px' }}>Description:</label>
            <TextField
              size="small"
              name="description"
              type="text"
              value={description}
              required
              onChange={(event) => setDescription(event.target.value)}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: '150px' }}>Date:</label>
            <TextField
              size="small"
              name="date"
              type="date"
              value={date}
              required
              onChange={(event) => setDate(event.target.value)}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: '150px' }}>Specialist:</label>
            <TextField
              size="small"
              name="specialist"
              type="text"
              value={specialist}
              required
              onChange={(event) => setSpecialist(event.target.value)}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: '150px' }}>Health Check Rating:</label>
            <TextField
              size="small"
              name="healthCheckRating"
              type="number"
              inputProps={{ min: 0, max: 3 }}
              value={healthCheckRating}
              required
              onChange={(event) => setHealthCheckRating(Number(event.target.value))}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: '150px' }}>Diagnosis Codes:</label>
            <TextField
              size="small"
              name="diagnosisCodes"
              type="text"
              value={diagnosisCodes}
              onChange={(event) => setDiagnosisCodes(event.target.value.split(','))}
            />
          </Box>

          <Button type="submit">Submit</Button>
        </form>
        </div>
      )}
    </div>
  );
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
      <NewHealthCheckEntry patient={patient} diagnoses={diagnoses}/>
      <div>
        <h3>Entries</h3>
        {patient.entries && patient.entries.map((entry: Entry) => (
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
