import express from 'express';
import { adminVerifiedUser } from "../controllers/adminController.js";

const router = express.Router();

router.get('/getUsers', adminVerifiedUser);

export default router;
