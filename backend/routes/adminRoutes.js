const express = require('express');
const { adminVerifiedUser } = require("../controllers/adminController");
const router = express.Router();

router.get('/getUsers', adminVerifiedUser);

module.exports = router;