import express from 'express';
import getLetters from './get-letters';

const router = express.Router();

router.get('/letters', getLetters);

export default router;
