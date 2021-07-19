require('dotenv').config();
const express = require('express');
const chatbotModel = require('../models/chatbot.model');


const router = express.Router();
router.post('/setup-profile', chatbotModel.setupProfile);
router.post('/webhook', chatbotModel.postWebhook);
router.get('/webhook', chatbotModel.getWebhook);

module.exports = router;