const express = require("express");
const { register, login } = require("../controllers/authController");
const userValidation = require("../validations/userValidation");
const authRouter = express.Router();

authRouter.post("/register",(req,res,next)=>{
    const {error} = userValidation.validate(req.body);
    if(error) return res.send({status:0,message:error.details[0].message});
    next();
},register);


authRouter.post("/login",login);

module.exports=authRouter;