const express = require("express");
const { addTeacher, getTeachers } = require("../controllers/teacherController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/add", auth, role("admin"), addTeacher);
router.get("/", auth, role("admin"), getTeachers);

module.exports = router;
