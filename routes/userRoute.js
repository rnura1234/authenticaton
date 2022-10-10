const express=require('express')
const { userSignUp } = require('../controllers/userSignUp')
const userRouter = express.Router()

userRouter.post('/signup', userSignUp);

module.exports = userRouter;