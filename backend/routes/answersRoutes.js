const express = require('express');
const { answers } = require("../controllers/answersController");
const router = express.Router();

router.post('/answers', answers);

export default router;