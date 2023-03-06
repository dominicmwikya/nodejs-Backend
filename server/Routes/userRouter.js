
const express= require('express')
const userRouter=express.Router()
    const {UserController}=require('../controllers/UserController')
    const {AuthMiddleware} =require('../Middleware/AuthMiddleware')
    const {Validator}=require('../Middleware/Validator')
        userRouter.get('/auth', AuthMiddleware.validToken,async(req, res)=>{
            res.json(req.token);  })
        userRouter.post('/login',Validator.validateInput,UserController.login);

        userRouter.get('/', AuthMiddleware.validToken,UserController.getUsers)

        userRouter.post('/post', UserController.createUser);
module.exports=userRouter