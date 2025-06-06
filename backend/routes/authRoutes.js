import express from 'express';
import { register, login, verify, resendCode } from '../controllers/authController.js';

const router = express.Router();

router.post('/registration', register);
router.post('/login', login);
router.post('/verify', verify);
router.post('/resendCode', resendCode);
export default router;
