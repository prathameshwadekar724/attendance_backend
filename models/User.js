const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true}
});

let studentSchema = mongoose.Schema({
    name:{type:String,required:true},
    rollNumber:{type:String,required:true},
    class:{type:String,required:true},
    division:{type:String,required:true},
    parentContact:{type:String,required:true},
    isActive:{type:Boolean,default:true}
});

let attendanceSchema = mongoose.Schema({
    studentId:{type:mongoose.Schema.Types.ObjectId,ref:"studentData"},
    date:{type:Date,required:true},
    status:{type:String,required:true}
});

let userModel = mongoose.model("userData",userSchema);
let studentModel = mongoose.model("studentData",studentSchema);
let attendanceModel = mongoose.model("attendanceData",attendanceSchema);

module.exports={userModel,studentModel,attendanceModel};