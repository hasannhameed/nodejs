const express = require('express');
const router = express.Router();
const controllers = require('../controllers/viewController')

router.get('/',controllers.getView)

module.exports = router;