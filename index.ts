import express from 'express';
import diagnoRoute from './routes/diagnoses';
import patientRoute from './routes/patients';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors())

const PORT = 3001;

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoRoute);

app.use('/api/patients', patientRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});