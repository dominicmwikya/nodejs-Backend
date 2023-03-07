// const  {Items} =require('../models/Items')
const {Items} = require('../models');
class ItemServices{
      static getItems=async()=>{
        try {
            const users= await Items.findAll();
            return users;
           } catch (error) {
            return error;
              
           }

     }

      _createItem=async(data)=>{
        try {
            const response= await Items.create(data);
            return response;
        } catch (error) {
            return error;
        }
     }
}

module.exports={ItemServices}