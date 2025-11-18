const express = require("express");
const { addTeacher, getTeachers, getStudentsForTeacher } = require("../controllers/teacherController");
const auth = require("../middlewares/authMiddleWare");
const role = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/add", auth, role("admin"), addTeacher);
router.get("/", auth, role("admin"), getTeachers);
router.get("/student",auth,role("admin","teacher"),getStudentsForTeacher);
module.exports = router;
