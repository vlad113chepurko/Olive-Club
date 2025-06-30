const express = require('express');
const { adminGetUsers, adminRemoveUser, adminDownload, adminCheckSurvey } = require("../controllers/adminController");
const router = express.Router();

router.get('/getUsers', adminGetUsers);
router.post('/removeUser', adminRemoveUser);
router.get('/export-users', adminDownload);
router.post('/getUserSurvey', adminCheckSurvey);

module.exports = router;