
const express= require('express')
const itemsRouter=express.Router()
const {ItemsController} =require('../controllers/ItemsController')
const {AuthMiddleware} =require('../Middleware/AuthMiddleware')
  itemsRouter.post('/create',AuthMiddleware.validateToken,ItemsController.createItem)
  // itemsRouter.get('/get', authRole(ROLE.ADMIN), itemsController.getItems);
  itemsRouter.get('/',  AuthMiddleware.validateToken, ItemsController.fetchItems);
  itemsRouter.delete('/:id',  AuthMiddleware.validateToken, ItemsController.deleteItem);

  itemsRouter.get('/:id',  AuthMiddleware.validateToken, ItemsController.getById)
  
  // itemsRouter.put('/update/:id', itemsController.updateItem);

module.exports=itemsRouter;