import axios from "axios";
import { HealthCheckEntry, Patient, PatientFormValues, NewHealthCheckEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};
const createEntry = async (patientId: string, entry: NewHealthCheckEntry): Promise<HealthCheckEntry> => {
  const { data } = await axios.post<HealthCheckEntry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  );
  return data;
};
export default {
  getAll, create, createEntry
};

