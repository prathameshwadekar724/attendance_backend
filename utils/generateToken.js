const jwt = require("jsonwebtoken");
let generateToken = (user,sessionId)=>{
    return jwt.sign(
        {
            id:user._id,
            email:user.email,
            role:user.role,
            class:user.classAssigned || null,
            division:user.division || null,
            sessionId:sessionId
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );
};
module.exports=generateToken;