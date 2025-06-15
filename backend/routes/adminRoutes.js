const express = require('express');
const { adminGetUsers, adminRemoveUser, adminDownload } = require("../controllers/adminController");
const router = express.Router();

router.get('/getUsers', adminGetUsers);
router.post('/removeUser', adminRemoveUser);
router.get('/export-users', adminDownload);

module.exports = router;