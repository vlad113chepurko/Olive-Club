const express = require('express');
const { register, login, verify, resendCode, getVerifyUser } = require('../controllers/authController');

const router = express.Router();

router.post('/form/registration', register);
router.post('/form/login', login);
router.post('/form/verify', verify);
router.post('/resendCode', resendCode);
router.get('/getVerifyUser', getVerifyUser);

module.exports = router;