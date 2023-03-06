
const express= require('express')
const userRouter=express.Router()
    const {UserController}=require('../controllers/UserController')
    const {AuthMiddleware} =require('../Middleware/AuthMiddleware')
    const {Validator}=require('../Middleware/Validator')
        userRouter.get('/auth', AuthMiddleware.validateToken, async(req,res)=>{
            res.json(req.user)
        })
        userRouter.post('/login',Validator.validateInput,UserController.login);

        userRouter.get('/', AuthMiddleware.validateToken,UserController.getUsers)

        userRouter.post('/post', UserController.createUser);


        userRouter.post('/verify_token', AuthMiddleware.refreshToken)
module.exports=userRouter