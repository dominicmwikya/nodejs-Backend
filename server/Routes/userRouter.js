import express from 'express';
import { UserController } from '../controllers/UserController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { Validator } from '../middleware/Validator';
import { validationSchema } from '../Middleware/ValidationSchemas/ValidationSchema';

const userRouter = express.Router();

userRouter.get('/auth', AuthMiddleware.validateToken, UserController.auth);
userRouter.post('/login',validationSchema.loginSchema , UserController.login);
userRouter.get('/', AuthMiddleware.validateToken, UserController.getUsers);


userRouter.post('/post', validationSchema.RegisterSchema, UserController.createUser);
userRouter.delete('/:id', UserController.deleteUser);
userRouter.post('/verify_token', AuthMiddleware.refreshToken);

export { userRouter };