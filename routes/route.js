const express = require('express');
const router = express.Router();
//const homeControl = require('../controllers/home');
const sendControl = require('../controllers/sendMessage');

//router.get('/', homeControl.getHome);
router.get('/', sendControl.getMessageController);
router.post('/', sendControl.sendMessageController);

module.exports = router;