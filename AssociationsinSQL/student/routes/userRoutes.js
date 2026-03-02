const express = require('express');
const router = express.Router();
const userControls = require('../controller/users');

router.post('/user',userControls.postUser);
router.get('/user/',userControls.getUsers);
router.get('/user/:id', userControls.getUser);
router.delete('/user/:id', userControls.deleteUser);

module.exports = router;