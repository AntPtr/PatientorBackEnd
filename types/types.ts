export enum Gender {
    Male = 'male',
    Female = 'female',
}

export interface Diagnose {
    code: String,
    name: String,
    latin?: String
}

export interface Patient {
    id: String,
    name: String,
    dateOfBirth: String,
    ssn: String,
    gender: Gender,
    occupation: String,
    entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry  extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string,
      };
}


export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge:{
        date: string;
        criteria: string;
    };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;