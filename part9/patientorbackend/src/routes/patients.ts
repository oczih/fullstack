import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import { z } from 'zod';
import { NewPatientSchema} from '../utils/toNewPatientEntry';
import { EntrySchema } from '../utils/toNewEntry';
import { Entry, NewPatient,PatientPreview } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};


const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = EntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
  };

router.post('/', newPatientParser, (req: Request<any, any, NewPatient>, res: Response<PatientPreview>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
});

router.post('/:id/entries', newEntryParser, (req: Request, res: Response<Entry>) => {
  const addedEntry = patientsService.addEntry(req.body, req.params.id);
  res.json(addedEntry);
});

router.use(errorMiddleware);


export default router