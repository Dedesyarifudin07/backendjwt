const express = require('express');
const router = express.Router();
const register = require('./route/register');

//regiter acount
router.post('/',register.register);
router.post('/login',register.login);

module.exports =router;