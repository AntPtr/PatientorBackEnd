import express from 'express';
import diagnoService from "../services/diagnoService"

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diagnoService.getEntries());
});


export default router;