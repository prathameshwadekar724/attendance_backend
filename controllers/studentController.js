const {studentModel, attendanceModel} = require("../models/User");

let addStudents = async(req,res)=>{
    try {
        let {name,rollNumber,class:studentClass,division,parentContact} = req.body;

        let exists = await studentModel.findOne({rollNumber});

        if(exists){
            return res.send({status:0,message:"Roll number already exits"});
        }

        let newStudent = new studentModel({
            name,
            rollNumber,
            class:studentClass,
            division,
            parentContact,
            isActive:true
        });

        await newStudent.save();

        return res.send({status:1,message:"Student saved successfully",data:newStudent});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
};

let getAllStudents = async(req,res)=>{
    try {
        let students = await studentModel.find().sort({createdAt:-1});

        return res.send({status:1,data:students});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}

let getSingleStudent = async(req,res)=>{
    try{
        let id = req.params.id;
        let student = await studentModel.findOne({id});
        if(!student){
            return res.send({status:0,message:"Student not found"});
        }
        return res.send({status:1,data:student});
    }catch(error){
        return res.send({status:0,error:error.message});
    }
}

let updateStudent = async(req,res)=>{
    try {
        let id = req.params.id;
        let updated = await studentModel.findByIdAndUpdate(id,req.body,{new:true});

        if(!updated){
            return res.send({status:0,message:"Student not found"});
        }
        return res.send({status:1,message:"Student updated successfully",data:updated});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}

let deleteStudent = async(req,res)=>{
    try {
        let id = req.params.id;
        let deleted = await studentModel.findByIdAndDelete(id);

        if(!deleted){
            return res.send({status:0,message:"Student not found"});
        }
        await attendanceModel.deleteMany({studentId:id});
        return res.send({status:1,message:"Student deleted successfully"});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}

let toggleStudentStatus = async(req,res)=>{
    try {
        let id = req.params.id;

        let student = await studentModel.findById(id);

        if(!student){
            return res.send({status:0,message:"Student not found"});
        }

        student.isActive = !student.isActive;
        await student.save();

        return res.send({status:1,message:`Student is now ${student.isActive ? "Active":"Inactive"}`});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}

module.exports = {addStudents,getAllStudents,getSingleStudent,updateStudent,deleteStudent,toggleStudentStatus};