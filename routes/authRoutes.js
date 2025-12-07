const express = require("express");
const { register, login } = require("../controllers/authController");
const userValidation = require("../validations/userValidation");
const authMiddleWare = require("../middlewares/authMiddleWare");
const { userModel, teacherModel } = require("../models/User");
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
authRouter.get("/logout", authMiddleWare, async (req, res) => {
    const user = await userModel.findById(req.user.id) 
             || await teacherModel.findById(req.user.id);

    if (!user) return res.send({ status: 0, message: "User not found" });

    user.sessionId = null;
    await user.save();

    return res.send({ status: 1, message: "Logged out successfully" });
});

module.exports=authRouter;