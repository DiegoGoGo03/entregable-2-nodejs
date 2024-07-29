const express = require('express');
const userRouter = require('./user.router')
const router = express.Router();

// Place the routes here
router.use('/users', userRouter)

module.exports = router;