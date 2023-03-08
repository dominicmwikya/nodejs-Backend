
const {Items} = require('../models');
class ItemServices{
      static getItems=async()=>{
        try {
            const items= await Items.findAll({attributes: ['item_name', 'min_qty', 'qty']});
            return items;
           }
         catch (error) {
            return error;
           }

     }

      static findItemByName=async(name)=>{
        try {
            const item = await Items.findOne({where:{item_name:name, flag:1}});
                return item;
           } catch (error) {
             return error;
           }
      }

      static registerItem=async(item_name, item_category, min_qty)=>{
        try {
            const result= await Items.create({item_name:item_name, item_category:item_category, min_qty:min_qty});
              return result;
           } catch (error) {
                await res.send({error:error})
           }
     }

    static findItemByByPk=async(id)=>{
      const item = await Items.findByPk(id,  {
        attributes: ['id','item_name', 'min_qty', 'qty']
      });
      return item;
    }
     static removeItem=async(id)=>{
        const result=await Items.destroy({where:{id:id}});
        return result;
     }
}

module.exports={ItemServices}