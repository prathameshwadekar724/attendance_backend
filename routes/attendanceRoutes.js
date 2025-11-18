const express = require("express");
const {
    markAttendance,
    markClassAttendance,
    updateAttendance,
    getTodayAttendance,
    getAttendanceByStudent,
    getAttendanceByDate,
    getTodayAttendanceForAdmin
} = require("../controllers/attendanceController");

const attendanceValidation = require("../validations/attendanceValidation");
const authMiddleware = require("../middlewares/authMiddleWare");
const roleMiddleware = require("../middlewares/roleMiddleware");

const attendanceRouter = express.Router();

attendanceRouter.post(
    "/mark",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    (req, res, next) => {
        const { error } = attendanceValidation.validate(req.body);
        if (error) return res.send({ status: 0, message: error.details[0].message });
        next();
    },
    markAttendance
);

attendanceRouter.post(
    "/class/mark",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    markClassAttendance
);

attendanceRouter.put(
    "/update/:id",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    updateAttendance
);

attendanceRouter.get(
    "/today",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    getTodayAttendance
);

attendanceRouter.get(
    "/student/:id",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    getAttendanceByStudent
);

attendanceRouter.post(
    "/date",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    getAttendanceByDate
);
attendanceRouter.get("/admin/today",authMiddleware,roleMiddleware("admin","teacher"),getTodayAttendanceForAdmin);
module.exports = attendanceRouter;
