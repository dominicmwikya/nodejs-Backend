const {Users} = require('../models');
class UserServices{
 static getUserByEmail=async(value)=>{
   try {
     const user = await Users.findOne({where:{email:value, flag:1}});
         return user;
    } catch (error) {
      return {
        error:error,
        status:400
      }
    }
    }

  static destroyUser=async(id)=>{
      const result=await Users.destroy({where:{id:id}});
      return result;
   }

  static registerUser=async(username, email,hashedResult,role)=>{
      const result=await Users.create({
          username:username,
          password:hashedResult,
          email:email,
          role:role
        });
      return result
  }
}
module.exports={UserServices}