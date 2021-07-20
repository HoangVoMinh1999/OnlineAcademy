require('dotenv').config();
const express = require('express');
const chatbotModel = require('../models/chatbot.model');


const router = express.Router();

// setup get-started button
router.post('/setup-profile', chatbotModel.setupProfile);

// setup persistent menu
router.post('/setup-persistent-menu', chatbotModel.setupPersistentMenu);

router.post('/webhook', chatbotModel.postWebhook);
router.get('/webhook', chatbotModel.getWebhook);

module.exports = router;