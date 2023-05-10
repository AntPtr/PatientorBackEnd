import express from 'express';
import patientService from "../services/patientService"

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

router.post('/', (req, res) => {
  try{
    const newEntry = patientService.newPatient(req.body);

    const added = patientService.addPatient(newEntry);
    res.json(added);
  }catch(e) {
    if(e instanceof Error){
      res.status(400).send(e.message);
    } else {
      res.status(200).send('unspected error')
    }
  }
})

router.get('/:id', (req, res) =>{
  console.log(req.params.id);
  const patient = patientService.findPatient(req.params.id);
  console.log(patient)
  res.json(patient)
})

router.post('/:id/entries', (req, res) =>{
  try{
    console.log("Entry");
    const newEntry = patientService.parseEntry(req.body);
    const added = patientService.addEntry(req.params.id, newEntry);

    res.json(added)
  } catch(e) {
    if(e instanceof Error){
      res.status(400).send(e.message);
    } else {
      res.status(200).send('unspected error')
    }
  }
  
})

export default router;