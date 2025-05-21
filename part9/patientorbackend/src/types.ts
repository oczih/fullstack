export type Diagnosis = {
    "code": string;
    "name": string;
    "latin"?: string;
};

type Patient = {
    "id": string;
    "name": string;
    "dateOfBirth": string;
    "ssn": string;
    "gender": string;
    "occupation": string;
};

export type PatientPreview = Omit<Patient, "ssn" >;