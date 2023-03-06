
const express= require('express')
const itemsRouter=express.Router()
const {ItemsController} =require('../controllers/ItemsController')
const {AuthMiddleware} =require('../Middleware/AuthMiddleware')
  itemsRouter.post('/create',ItemsController.createItem)
  // itemsRouter.get('/get', authRole(ROLE.ADMIN), itemsController.getItems);
  itemsRouter.get('/get',AuthMiddleware.validToken,ItemsController.getItems);

  
  // itemsRouter.put('/update/:id', itemsController.updateItem);
  // itemsRouter.delete('/delete/:id', itemsController.deleteItem);
module.exports=itemsRouter;