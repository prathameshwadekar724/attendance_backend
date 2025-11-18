const { userModel } = require("../models/User");
const bcrypt = require("bcrypt");
exports.addTeacher = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) return res.send({ status: 0, message: "Email already exists" });
        let hashedPassword = await bcrypt.hash(password,10);
        const teacher = new userModel({
            name,
            email,
            password:hashedPassword,
            role: "teacher",
        });

        await teacher.save();

        return res.send({ status: 1, message: "Teacher added", data: teacher });

    } catch (err) {
        return res.send({ status: 0, error: err.message });
    }
};

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await userModel.find({ role: "teacher" });
        return res.send({ status: 1, data: teachers });
    } catch (err) {
        return res.send({ status: 0, error: err.message });
    }
};
