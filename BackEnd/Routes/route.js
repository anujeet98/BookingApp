const express = require('express');
const appController = require('../Contoller/appController.js');

const router = express.Router();

router.get('/get-users', appController.getUsers);

router.post('/add-user', appController.postUser);

router.delete('/delete-user/:id', appController.deleteUser);

router.get('/get-user/:id', appController.getUser);

module.exports = router;