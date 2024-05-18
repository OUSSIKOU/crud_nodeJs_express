const express = require('express');
const router = express.Router();
const controllersUsres = require('../controllers/user');
router.post('/signup',controllersUsres.signup);
router.post('/login',controllersUsres.login);
module.exports = router ;