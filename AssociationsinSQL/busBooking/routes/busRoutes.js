const express = require('express');
const router = express.Router();
const controllers = require('../controllers/busController')

router.get('/',controllers.getBuses)
router.get('/:id',controllers.getBus)
router.post('/',controllers.postBus)
router.delete('/:id',controllers.deleteBus)
router.put('/:id',controllers.putBus)

module.exports = router;