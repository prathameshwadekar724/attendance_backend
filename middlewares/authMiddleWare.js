const jwt = require("jsonwebtoken");
const {userModel,teacherModel} = require("../models/User");
let authMiddleWare= async(req,res,next)=>{
    let token = req.headers["authorization"];

    if(!token){
        return res.send({status:0,message:"Access denied"});
    }
    try {
        token = token.split(" ")[1];
        let decoded = jwt.verify(token,process.env.JWT_SECRET);
        let user = await userModel.findById(decoded.id) || await teacherModel.findById(decoded.id);

        if(!user || user.sessionId!==decoded.sessionId){
            return res.send({status:0,message:"Invalid session. Login again"});
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}
module.exports=authMiddleWare;