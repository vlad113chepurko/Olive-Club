const express = require('express');
const { register, login, verify, resendCode } = require('../controllers/authController');

const router = express.Router();

router.post('/form/registration', register);
router.post('/form/login', login);
router.post('/form/verify', verify);
router.post('/resendCode', resendCode);

module.exports = router;
