import diagnoData from '../data/diagnoses.json'
import { Diagnose } from '../types/types';

const diagnoses: Array<Diagnose> = diagnoData as Array<Diagnose>;


const getEntries = () => {
    return diagnoses;
  };

export default {
    getEntries
};