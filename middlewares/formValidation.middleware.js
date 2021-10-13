import Joi from 'joi';


export const createAdminUserValidation = (req, res, next) =>{
//server side validation
console.log(req.body)
const schema = Joi.object({
    fname: Joi.string().max(20).alphanum().required(),
    lname: Joi.string().max(20).alphanum().required(),
    email: Joi.string().max(50).email({ minDomainSegments: 2 }),
    password: Joi.string().min(8).required(),
   phone: Joi.string().min(15),
   address: Joi.string().max(100),
   dob: Joi.date(),
   gender: Joi.string().max(6),
    
});

const value = schema.validate(req.body)
console.log(value)
if(value.error){
    return res.json({
        status: "error",
        message: value.error.message,
    })
}
next();
};


