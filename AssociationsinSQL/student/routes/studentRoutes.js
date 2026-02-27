
const express = require('express');
const router = express.Router()
const PrintTheSuccess = require('../controller/message');

router.get('/students', PrintTheSuccess);

module.exports = router;