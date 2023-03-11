import Joi from "joi";
class validationSchema{
    static RegisterSchema=async(req,res, next)=>{
        const userSchema = Joi.object({
          username: Joi.string().min(3).required(),
          email: Joi.string().email().required(),
          role:Joi.string().required(),
          password: Joi.string().min(4).max(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
          rpassword:Joi.ref('password')
        });
        const {error}= userSchema.validate(req.body);
        if(error){

            console.log(error.details[0].message);
            return res.status(400).json({error: error.details[0].message });
        }
        next();
       }

    static loginSchema=async(req,res, next)=>{
       const loginSchema= Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(8).required()
       });
       const {error}= loginSchema.validate(req.body);
       if(error){
        return res.status(400).json({error:error.details[0].message});
       }
       next()
    }

    static itemSchema=async(req,res, next)=>{
        const options={
            allowUnknown:true,
        }
        const itemSchema=Joi.object({
          item_name:Joi.string().max(10).required(),
          item_category:Joi.string().required(),
          min_qty:Joi.number().integer().min(1).required(),
        })
        const {error}=itemSchema.validate(req.body, options);
        if(error){
            return res.status(400).json({error:error.details[0].message});
        }
        next();
    }

}



export {validationSchema}