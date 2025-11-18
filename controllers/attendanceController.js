const { date } = require("joi");
const {studentModel,attendanceModel} = require("../models/User");

let markAttendance = async(req,res)=>{
    try {
        let {studentId,status} = req.body;
        let today = new Date().setHours(0,0,0,0);

        let exists = await attendanceModel.findOne({studentId,date:today});

        if(exists){
            return res.send({status:0,message:"Attendance already marked for this student"});
        }

        let newAttendance = new attendanceModel({
            studentId,
            status,
            date:today
        });
        await newAttendance.save();

        return res.send({status:1,message:"Attendace marked",data:newAttendance});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}

let markClassAttendance = async(req,res)=>{
    try {
        let {className,division,attendanceList} = req.body;
        let today = new Date().setHours(0,0,0,0);

        let student = await studentModel.find({class:className,division});

        if(!student.length){
            return res.send({status:0,message:"No students found"});
        }

        let result = [];

        for(let att of attendanceList){
            let exits = await attendanceModel.findOne({
                studentId:att.studentId,
                date:today
            });

            if(!exits){
                let newEntry = new attendanceModel({
                    studentId:att.studentId,
                    status:att.status,
                    date:today
                });
                await newEntry.save();
                result.push(newEntry);
            }
        }
        return res.send({status:1,message:"Class attendance submitted",data:result});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}


let updateAttendance = async(req,res)=>{
    try {
        let id = req.params.id;
        let updated = await attendanceModel.findByIdAndUpdate(id,req.body,{new:true});
        if(!updated){
            return res.send({status:0,message:"Attendance not found"});
        }
        return res.send({status:1,message:"Attendance updated",data:updated});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}

let getTodayAttendance = async(req,res)=>{
    try {
        let today = new Date().setHours(0,0,0,0);
        let result = await attendanceModel.find({date:today}).populate("studentId");

        return res.send({status:1,data:result});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}

let getAttendanceByStudent = async(req,res)=>{
    try {
        let studentId = req.params.id;

        let result = await attendanceModel.find({studentId}).sort({data:-1});

        return res.send({status:1,data:result});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}

let getAttendanceByDate = async(req,res)=>{
    try {
        let {date} = req.body;

        let selectedDate = new Date(date).setHours(0,0,0,0);

        let result = await attendanceModel.find({date:selectedDate}).populate("studentId");

        return res.send({status:1,data:result});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}

module.exports={markAttendance,markClassAttendance,updateAttendance,getTodayAttendance,getAttendanceByStudent,getAttendanceByDate};