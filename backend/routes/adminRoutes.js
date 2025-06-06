const express = require('express');
const adminVerifiedUser = require("../controllers/adminController.js");
const router = express.Router();

router.get('/getUsers', adminVerifiedUser);

export default router;
