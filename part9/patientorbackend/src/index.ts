import express from 'express';
import diagnosisService from './services/diagnosisService';
import patientService from './services/patientsService';
const app = express();
import cors from 'cors';
app.use(cors());
app.use(express.json());

const PORT = 3001;
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.get('/api/diagnoses', (_req, res) => {
    res.send(diagnosisService.getEntries());
});

app.get('/api/patients', (_req, res) => {
  res.send(patientService.getEntries());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});