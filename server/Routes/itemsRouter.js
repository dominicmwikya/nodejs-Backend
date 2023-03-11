import express from 'express';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { ItemsController } from '../controllers/ItemsController';
import { validationSchema } from '../Middleware/ValidationSchemas/ValidationSchema';

const itemsRouter = express.Router();

itemsRouter.post('/create', AuthMiddleware.validateToken,validationSchema.itemSchema, ItemsController.createItem);

itemsRouter.get('/', AuthMiddleware.validateToken, ItemsController.fetchItems);

itemsRouter.delete('/:id', AuthMiddleware.validateToken, ItemsController.deleteItem);

itemsRouter.get('/:id', AuthMiddleware.validateToken, ItemsController.getById);

export { itemsRouter };
