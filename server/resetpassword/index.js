'use strict';

import express from 'express';
var controller = require('./requestresetpassword.controller');

var router = express.Router();

router.post('/', controller.requestresetpassword);

module.exports = router;
