const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    sessionId:{type:String,default:null}
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
    status:{type:String,required:true},
});

let tacherSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    classAssigned:{type:String,required:true},
    division:{type:String,required:true},
    sessionId:{type:String,default:null}
})
let userModel = mongoose.model("userData",userSchema);
let studentModel = mongoose.model("studentData",studentSchema);
let attendanceModel = mongoose.model("attendanceData",attendanceSchema);
let teacherModel = mongoose.model("teacherData",tacherSchema);
module.exports={userModel,studentModel,attendanceModel,teacherModel};