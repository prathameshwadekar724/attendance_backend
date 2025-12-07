const {userModel, teacherModel} = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
let register = async(req,res)=>{
    try{
        let {name,email,password,role} = req.body;

        let userExist = await userModel.findOne({email});
        if(userExist){
            return res.send({status:0,message:"User already exists"});
        }

        let hashedPassword = await bcrypt.hash(password,10);

        let newUser = new userModel({
            name,
            email,
            password:hashedPassword,
            role
        });

        await newUser.save();

        res.send({status:1,message:"User registered successfully",data:newUser});
    }catch(err){
        res.send({status:0,error:err.message});
    }
}

let login = async(req,res)=>{
    try{
        let {email,password} = req.body;

        let dbUser = await userModel.findOne({email});
        if(!dbUser){
            dbUser = await teacherModel.findOne({email});
        }
        if(!dbUser){
            return res.send({status:0,message:"Email not found"});
        }

        let isMatch = await bcrypt.compare(password,dbUser.password);

        if(!isMatch){
            res.send({status:0,message:"Incorrect Password"});
        }

        let sessionId = Date.now().toString();
        dbUser.sessionId = sessionId;
        await dbUser.save();
        let token = generateToken(dbUser,sessionId);
        res.send({status:1,message:"Login successfully",token,data:dbUser});
    }catch(err){
        res.send({status:0,error:err.message});
    }

}

module.exports={register,login};