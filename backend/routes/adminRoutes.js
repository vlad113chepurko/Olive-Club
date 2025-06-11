const express = require('express');
const { adminVerifiedUser } = require("../controllers/adminController");
const { adminRemoveUser } = require("../controllers/adminController");
const router = express.Router();

router.get('/getUsers', adminVerifiedUser);
router.post('/removeUser', adminRemoveUser);

module.exports = router;