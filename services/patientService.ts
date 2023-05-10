import  patients  from '../data/patients'
import { Patient, NonSensitivePatientEntry, Gender, Entry } from '../types/types';
import { v4 as uuidv4 } from 'uuid';


export const findPatient = (id: string) : Patient | undefined => {
    const fPatient = patients.find(p => p.id === id)
    return fPatient
}

const getPatients = () => {
    return patients;
  };

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id,name,dateOfBirth,gender,occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate =  (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (str: string): str is Gender => {
    return ['male', 'female'].includes(str);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
  };

const parseOcccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing comment');
    }
  
    return occupation;
  };

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing comment');
    }
  
    return name;
};
const isSSN = (ssn: string): boolean => {
    return(ssn[6] === '-') 
}

const parseSSn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn) || !isSSN(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn
}
//TODO
const newPatient = (object: any): Patient => {
    const nPatient = {
        id: uuidv4(),
        name: parseName(object.name),
        ssn: parseSSn(object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOcccupation(object.occupation),
        entries: object.entries
    };
    return nPatient
}

const addPatient = (entry: Patient): Patient => {
    const newPatient = {
        id: entry.id,
        name: entry.name,
        ssn: entry.ssn,
        dateOfBirth: entry.dateOfBirth,
        gender: entry.gender,
        occupation: entry.occupation,
        entries: entry.entries
    };
    patients.push(newPatient);
    return newPatient;
}

const parseEntry = (entry: Entry) : Entry => {
    if (!entry){
        throw new Error('No entry insert');
    }
    if (!entry.date){
        throw new Error('No date insert');
    }
    if (!entry.description){
        throw new Error('No description insert');

    }
    if(!entry.specialist){
        throw new Error('Missing specialist');
    }
    if(entry.type === "HealthCheck"){
        if(!entry.healthCheckRating){
            throw new Error('Missing health check rating');
        }
    }

    if(entry.type === "Hospital"){
        if(!entry.discharge){
            throw new Error('Missing discharge info');
        }
    }

    if(entry.type === "OccupationalHealthcare"){
        if(!entry.employerName){
            throw new Error('Missing employer name');
        }
    }

    return entry;

}

const addEntry = (id: string, entry: Entry): Patient => {
    patients.forEach(p => {
        if(p.id === id) {
            p.entries.push(entry);
        }
    });
    const added = patients.find( p => p.id === id);

    if(!added){
        throw new Error('No match for patient id');
    }

    return added;
}

export default {
    getPatients,
    getNonSensitiveEntries,
    addPatient,
    newPatient,
    findPatient,
    parseEntry,
    addEntry
};