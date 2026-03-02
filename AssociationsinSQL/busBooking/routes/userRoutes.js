const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController')

router.get('/',controllers.getUsers)
router.get('/:id',controllers.getUser)
router.post('/',controllers.postUser)
router.delete('/:id',controllers.deleteUser)
router.put('/:id',controllers.putUser)

module.exports = router;