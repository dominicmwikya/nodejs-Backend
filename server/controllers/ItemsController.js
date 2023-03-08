const {Items}= require('../models')
const{ItemServices} = require('../Services/itemService')
class ItemsController{
    static fetchItems=async(req,res)=>{
       try {
            const items= await ItemServices.getItems();
            res.send(items);
       } catch (error) {
             res.status(400).json({error:error});
       }
    }

    static createItem= async(req,res)=>{
        const {item_name, item_category, min_qty}= req.body;
           try {
            const itemExt= await ItemServices.findItemByName(item_name);
            if(itemExt){
                 res.json({error:"item "+itemExt.item_name+" already exist! choose new name"});
            }else{
                const response= await ItemServices.registerItem(item_name, item_category, min_qty);
                if(response){
                 res.status(200).json(item_name+" created successfully");
                }
            }
           } catch (error) {
               res.status(400).json({error:"error  creating the item! Contact system Admin!"});
           }
       
     }
     
     static getItems=async(req,res)=>{
         try {
              const items=await Items.findAll();
              res.status(200).send(items); 
         } catch (error) {
             return res.send({error:error});
         }  
     }
     
     static updateItem=async(req,res)=>{
         const id=await req.params.id;
         const data=await req.body;
         Items.update(data, {where:{id:id}})
         .then(()=>{
                  res.send(" item with id "+id +" has been updated successfully");
         }).catch(error=>res.send({error:error.message}));
     }
     static getById=async(req,res)=>{
        const id=await req.params.id;
       try {
       
         const item= await ItemServices.findItemByByPk(id);
         await res.send(item);
       } catch (error) {
           res.send({error:error});
       }
     }


     static deleteItem=async(req,res)=>{
         const id=await req.params.id;
             try {
                 const record= await ItemServices.findItemByByPk(id);
                 if(record) {
                    const response=  await ItemServices.removeItem(record.id)
                     if(response){
                         res.send("item with id "+id+" deleted successfully")
                     }
                 }
                 else {
                    res.json({error: "item with "+id +" Already Deleted!"});
                 }
             } catch (error) {
                   res.json({error:error});
             }
     }
}
module.exports={ItemsController}