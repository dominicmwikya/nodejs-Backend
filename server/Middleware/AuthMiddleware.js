const {verify}= require('jsonwebtoken')
const {sign}= require('jsonwebtoken')

class AuthMiddleware{
    static validateToken(req,res, next){
        const accessToken= req.header("accessToken");
        if(!accessToken){
            return res.status(400).json({error:"No authorization header! Please login"});
        }else{
            verify(accessToken, process.env.SECRET_KEY_API_KEY,(err)=>{
            if(err){
                res.status(400).json({error:"User authentication failed"});
            }else{
                req.user=accessToken;
                next();
             }
            });
        }
    }
  static generateToken(user){
    const payload = {
        id: user.id,
        name: user.username,
        email: user.email
      };
      const options = {
        expiresIn: '1h'
      };
      return sign(payload, process.env.SECRET_KEY_API_KEY, options);
 }

 static async refreshToken(req,res){
    const oldToken = req.body.token;
       try {
        const decodedToken = verify(oldToken,process.env.SECRET_KEY_API_KEY);
        // Generate a new token with the same user information
        const newToken = this.generateToken(decodedToken);
    
        // Send the new token in the response
        res.json({ token: newToken });
       } catch (error) {
         // Handle token verification error
         res.status(400).json({ error: 'Invalid token' });
       }
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