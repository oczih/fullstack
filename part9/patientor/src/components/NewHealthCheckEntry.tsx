import React, { useState } from 'react';
import { Button, TextField, Box, Select, MenuItem, SelectChangeEvent, InputLabel } from '@mui/material';
import { HealthCheckRating, NewEntry, Entry, Patient } from '../types';
import patientsService from '../services/patients';

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
interface NewHealthCheckEntryProps {
  patient: Patient;
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export const NewHealthCheckEntry = ({ patient, entries, setEntries }: NewHealthCheckEntryProps) => {
  const [formVisible, setFormVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [entryOptions, setEntryOptions] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');
  const handleToggle = () => {
    setFormVisible(!formVisible);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!patient) {
    console.error("Patient is not defined");
    return;
  }

  let newEntry: NewEntry;

  switch (entryOptions) {
  case "HealthCheck":
    newEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
    };
    break;
  case "Hospital":
    newEntry = {
      type: "Hospital",
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };
    break;
  case "OccupationalHealthcare":
    newEntry = {
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName,
      sickLeave: sickLeaveStart && sickLeaveEnd
        ? {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          }
        : undefined,
    };
    break;
  default:
    throw new Error("Unhandled entry type: " + entryOptions);
}

  try {
    const data = await patientsService.createEntry(patient.id, newEntry);
    setEntries([...entries, data]);
    console.log("New entry added:", data);
    setDescription('');-
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setHealthCheckRating(0);
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
    setDischargeDate('');
    setDischargeCriteria('');
  } catch (error) {
    console.error("Error creating entry:", error);
  }
};
  const handleChange = (event: SelectChangeEvent) => {
    setEntryOptions(event.target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare');
  };
  return (
    <div>
      <TogglableButton onClick={handleToggle} isVisible={formVisible} />
    {formVisible && (
        <div>
          <h3>New HealthCheck Entry</h3>
          <form onSubmit={handleSubmit} style={{ border: '1px solid lightgrey', margin: '1em 0', padding: '0.5em' }}>
            <InputLabel id="demo-simple-select-autowidth-label">Entry Type</InputLabel>
            <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={entryOptions}
                label="Entry Type"
                onChange={handleChange}
                sx={{ width: '10rem', display: 'flex' }}
                >
                <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
                <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
                <MenuItem value={"Hospital"}>Hospital</MenuItem>
                </Select>
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
                <label style={{ minWidth: '150px' }}>Diagnosis Codes:</label>
                <TextField
                size="small"
                name="diagnosisCodes"
                type="text"
                value={diagnosisCodes}
                onChange={(event) => setDiagnosisCodes(event.target.value.split(','))}
                />
            </Box>
          {entryOptions === "HealthCheck" && <Box display="flex" alignItems="center" gap={1} mb={1}>
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
          }   

          { entryOptions === "OccupationalHealthcare" &&
            <div><Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: '150px' }}>Employer Name:</label>
            <TextField
              size="small"
              name="employerName"
              type="text"
              value={employerName}
              onChange={(event) => setEmployerName(event.target.value)}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: '150px' }}>Sick Leave Start:</label>
            <TextField
              size="small"
              name="sickLeaveStart"
              type="date"
              value={sickLeaveStart}
              onChange={(event) => setSickLeaveStart(event.target.value)}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: '150px' }}>Sick Leave End:</label>
            <TextField
              size="small"
              name="sickLeaveEnd"
              type="date"
              value={sickLeaveEnd}
              onChange={(event) => setSickLeaveEnd(event.target.value)}
            />
          </Box>
          </div>
          }
          { entryOptions === "Hospital" &&
            <div>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: '150px' }}>Discharge Date:</label>
            <TextField
              size="small"
              name="dischargeDate"
              type="date"
              value={dischargeDate}
              onChange={(event) => setDischargeDate(event.target.value)}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: '150px' }}>Discharge Criteria:</label>
            <TextField
              size="small"
              name="dischargeCriteria"
              type="text"
              value={dischargeCriteria}
              onChange={(event) => setDischargeCriteria(event.target.value)}
            />
          </Box>
          </div>}
          <Button type="button" onClick={handleToggle} style={{ marginRight: '1em' }}>
            {formVisible ? 'Cancel' : 'Add New Entry'}
          </Button>
          <Button type="button" onClick={() => {
            setDescription('');
            setDate('');
            setSpecialist('');
            setDiagnosisCodes([]);
            setHealthCheckRating(0);
            setEmployerName('');
            setSickLeaveStart('');
            setSickLeaveEnd('');
            setDischargeDate('');
            setDischargeCriteria('');
          }}>Reset</Button>
          <Button type="submit">Submit</Button>
        </form>
        </div>
      )}
    </div>
  );
};