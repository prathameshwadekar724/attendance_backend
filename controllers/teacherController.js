const { teacherModel, studentModel } = require("../models/User");
const bcrypt = require("bcrypt");
exports.addTeacher = async (req, res) => {
    try {
        const { name, email, password,classAssigned,division } = req.body;

        const exists = await teacherModel.findOne({ email });
        if (exists) return res.send({ status: 0, message: "Email already exists" });
        let hashedPassword = await bcrypt.hash(password,10);
        const teacher = new teacherModel({
            name,
            email,
            password:hashedPassword,
            role: "teacher",
            classAssigned,
            division
        });

        await teacher.save();

        return res.send({ status: 1, message: "Teacher added", data: teacher });

    } catch (err) {
        return res.send({ status: 0, error: err.message });
    }
};

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await teacherModel.find({ role: "teacher" });
        return res.send({ status: 1, data: teachers });
    } catch (err) {
        return res.send({ status: 0, error: err.message });
    }
};
exports.getStudentsForTeacher = async (req,res)=>{
    try {
        const teacher = req.user;
        const students = await studentModel.find({
            class:teacher.class,
            division:teacher.division
        });
        return res.send({status:1,data:students});
    } catch (error) {
        return res.send({status:0,error:error.message});
    }
}