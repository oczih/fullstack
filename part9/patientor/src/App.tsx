import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";
import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import SinglePatientPage from "./components/SinglePatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchPatientList();
    void fetchDiagnosesList();
  }, []);
  const match = useMatch('/patients/:id');

  const patientId = match?.params?.id;
  const patient = patients.find(p => p.id === patientId) || null;
    console.log(patient);
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route
              path="/patients/:id"
              element={
                patient ? (
                  <SinglePatientPage patient={patient} diagnoses={diagnoses} />
                ) : (
                  <div>Patient not found</div>
                )
              }
            />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
