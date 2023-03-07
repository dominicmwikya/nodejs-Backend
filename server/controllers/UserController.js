const {Users}=require('../models')
const {UserServices} = require('../Services/userService');
const {AuthMiddleware} = require( '../Middleware/AuthMiddleware');
const {Validator}= require('../Middleware/Validator');

class UserController{
  static createUser = async(req, res) => {
    const {username, email, password, role}=req.body;
    const response=await UserServices.getUserByEmail(email);
    if(response==0){
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
      const users= await UserServices.findAllUsers();
      res.send(users);
    } catch (error) {
          res.status(400).json({error:error})
    }
};

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

 static async login(req, res, next) {
      const { email, password } = req.body;
      try {
        const user=await  UserServices.getUserByEmail(email);
        const isValidPassword = await Validator.comparePassword(password, user.password);
            if (!user || !isValidPassword) {
              return res.status(400).json({ error: 'Invalid email or password' });
            }
          else{
            const tokenObject=AuthMiddleware.generateToken(user);
            res.json({ secretKey: tokenObject.token, user: tokenObject.user });
        }
      } catch (error) {
        next(error)
      }
    };

  static async auth(req, res) {
      const id= req.userId;
      try {
        const user = await UserServices.findUserByPk(id)
        if (!user) {
          throw new Error('Invalid user!');
        }
        res.json(user);
      } catch (error) {
        res.status(401).json({error:error});
      }
    };
    

};


module.exports = {UserController };