const {Items}= require('../models')
class ItemsController{
    static createItem= async(req,res)=>{
        const {item_name, item_category, min_qty}= req.body;
        try {
         const result= await Items.create({item_name:item_name, item_category:item_category, min_qty:min_qty});
         if(result){
             await res.status(200).send("Item "+result.id +"  Added successfully");
         }
        } catch (error) {
             await res.send({error:error})
        }
     }
     
     static getItems=async(req,res)=>{
         try {
              const items=await Items.findAll();
                  await res.status(200).send(items); 
         } catch (error) {
             await res.send({error:error});
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
       try {
         const id=res.params.id;
         const item= await Items.findOne({where:{id:id}});
         await res.status(200).send(item);
       } catch (error) {
           res.send({error:error});
       }
     }
     static deleteItem=async(req,res)=>{
         const delete_id=await req.params.id;
             try {
                 const record= await getById(delete_id);
                 if(record===null) {
                     res.send({error:delete_id +" Not Found"});
                 }
                 else {
                     const response= await Items.destroy({where:{id:record.id}});
                     if(response){
                         res.send("item with id "+delete_id+" deleted successfully")
                     }
                 }
             } catch (error) {
                   res.status(500).json({error:error});
             }
     }
}
module.exports={ItemsController}