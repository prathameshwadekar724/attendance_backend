const express  = require("express");
const {
    addStudents,
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
    toggleStudentStatus
} = require("../controllers/studentController");

const studentValidation = require("../validations/studentValidation");
const authMiddleware = require("../middlewares/authMiddleWare");
const roleMiddleware = require("../middlewares/roleMiddleware");

const studentRouter = express.Router();

studentRouter.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res, next) => {
        const { error } = studentValidation.validate(req.body);
        if (error) return res.send({ status: 0, message: error.details[0].message });
        next();
    },  
    addStudents
);

studentRouter.get("/", authMiddleware, roleMiddleware("admin", "teacher"), getAllStudents);

studentRouter.get("/:id", authMiddleware, roleMiddleware("admin", "teacher"), getSingleStudent);

studentRouter.put("/:id", authMiddleware, roleMiddleware("admin"), updateStudent);

studentRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteStudent);

studentRouter.patch("/:id/status", authMiddleware, roleMiddleware("admin"), toggleStudentStatus);

module.exports = studentRouter;
