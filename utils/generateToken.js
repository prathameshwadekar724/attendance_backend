const jwt = require("jsonwebtoken");
let generateToken = (user)=>{
    return jwt.sign(
        {
            id:user._id,
            email:user.email,
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
};
module.exports=generateToken;