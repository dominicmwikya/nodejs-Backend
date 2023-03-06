const {verify}= require('jsonwebtoken')
const {sign}= require('jsonwebtoken')
const bcrypt= require('bcrypt')
class AuthMiddleware{

    static validToken(req,res, next){
        const accessToken= req.header("token");
        if(!accessToken){
            return res.send({error:"No authorization header! Please login"});
        }else{
            verify(accessToken, process.env.SECRET_KEY_API_KEY,(err)=>{
            if(err){
                res.json({isLoggin:false,message:"User authentication failed"});
            }else{
                req.user=accessToken;
                next();
             }
            });
        }
    }
  static userToken(username, id){
    const securityToken=sign(
            {name:username, id:id},
            process.env.SECRET_KEY_API_KEY, 
            {expiresIn:process.env.JWT_EXPIRES_IN}
        );
    return securityToken;
 }

 static authRole(role){
    return (req,res,next)=>{
        if(req.user.role !==role){
            return res.status(403).send('Access denied');
        }
        next();
    }
 }
}
module.exports={AuthMiddleware}