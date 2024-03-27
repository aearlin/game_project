import express from 'express';
import getLetters from './get-letters';
import changePassword from './user-change-password';
import login from './user-login';
import signup from './user-signup';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/change-password', changePassword);
router.get('/letters', getLetters);

export default router;
