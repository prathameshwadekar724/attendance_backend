const jwt = require("jsonwebtoken");

let authMiddleWare=(req,res,next)=>{
    let token = req.headers["authorization"];

    if(!token){
        return res.send({status:0,message:"Access denied"});
    }
    try {
        token = token.split(" ")[1];
        let decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}
module.exports=authMiddleWare;