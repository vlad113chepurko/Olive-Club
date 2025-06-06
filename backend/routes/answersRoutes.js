import express from 'express';
import { answers } from '../controllers/answersController.js';

const router = express.Router();

router.post('/answers', answers);

export default router;