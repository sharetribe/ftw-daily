/**
 * This file contains server side endpoints that can be used to perform backend
 * tasks that can not be handled in the browser.
 *
 * The endpoints should not clash with the application routes. Therefore, the
 * endpoints are prefixed in the main server where this file is used.
 */

const express = require('express');

const initiateLoginAs = require('./api/initiate-login-as');
const loginAs = require('./api/login-as');

const router = express.Router();

router.get('/initiate-login-as', initiateLoginAs);
router.get('/login-as', loginAs);

module.exports = router;
