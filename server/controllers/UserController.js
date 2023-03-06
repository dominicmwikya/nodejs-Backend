const {Users}=require('../models')
const {UserServices} = require('../Services/userService');
const {AuthMiddleware} = require( '../Middleware/AuthMiddleware');
const {Validator}= require('../Middleware/Validator');

class UserController{
  static createUser = async(req, res) => {
    const response=await UserServices.getUserByEmail(email);
    if(response===false){
      const hashedResult= await Validator.hashPassword(password);
      const result= await UserServices.registerUser(username,email,hashedResult,role);
      if(result){
         res.send("User created successfully");  }
      else{ 
         res.send({erorr:"Error creating user"});  
       }
     }
    else{
      return res.send({error:email+ " already in use"});
    }   
}
static getUsers=async(req,res)=>{
  try {
      const users= await Users.findAll();
      return res.send(users);
  } catch (error) {
      res.status(401).send({error:error})
  }
}

static updateUser = async(req, res) => {
  const {username, email} = req.body;
  const user_id = req.params.id;
   const ustatus=Users.update(
      {username:username, email:email}, 
      {where:{id:user_id}}
    );
   if(ustatus){
      res.status(200).send("records for user id "
      + user_id+" updated successfully")
   }
};

static deleteUser = async(req, res) => {
 try {
      const id = await req.params.id;
      const result= await UserServices.destroyUser(id);
      return res.send(result);
 } catch (error) {
     res.status(500).send({error});
 }
};

 static async login(req, res) {
      const { email, password } = req.body;
      const user=await  UserServices.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: 'Invalid email' });
      }
      const isValidPassword = await Validator.comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid  password' });
      }
        const result=AuthMiddleware.userToken(user.username, user.id);
        return res.json({
                   secretKey: result,
                   username:user.username,
                   role:user.role,
                   id:user.id,
                   isLoggedin:true,
                   message:"Login successful"
        });
     }
};
module.exports = {UserController };