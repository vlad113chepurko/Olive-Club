const express = require('express');
const {
  register,
  login,
  verify,
  resendCode,
  getVerifyUser,
  setNewPassword,
  confirmCode, } = require('../controllers/authController');

const router = express.Router();

router.post('/form/registration', register);
router.post('/form/login', login);
router.post('/form/verify', verify);
router.post('/resendCode', resendCode);
router.get('/getVerifyUser', getVerifyUser);
router.post('/confirmCode', confirmCode);
router.post('/setNewPassword', setNewPassword);

module.exports = router;