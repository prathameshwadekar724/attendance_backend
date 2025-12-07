const express = require("express");
const { register, login } = require("../controllers/authController");
const userValidation = require("../validations/userValidation");
const authMiddleWare = require("../middlewares/authMiddleWare");
const authRouter = express.Router();

authRouter.post("/register",(req,res,next)=>{
    const {error} = userValidation.validate(req.body);
    if(error) return res.send({status:0,message:error.details[0].message});
    next();
},register);


authRouter.post("/login",login);
authRouter.get("/verify", authMiddleWare, (req, res) => {
    return res.send({ status: 1, message: "Valid token" });
});
module.exports=authRouter;