const express = require('express');
const { adminGetUsers } = require("../controllers/adminController");
const { adminRemoveUser } = require("../controllers/adminController");
const router = express.Router();

router.get('/getUsers', adminGetUsers);
router.post('/removeUser', adminRemoveUser);

module.exports = router;