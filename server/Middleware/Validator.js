import bcrypt from 'bcrypt';
import Joi from 'joi'
class Validator {
 static joiValidate=async(req,res, next)=>{
  const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    role:Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    rpassword:Joi.ref('password')
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }  
  next()
 }

  static comparePassword = async (plaintextPassword, hashedPassword) => {
    return await bcrypt.compare(plaintextPassword, hashedPassword);
  }

  static hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  }
}

export { Validator };
