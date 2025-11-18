const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const studentRouter = require("./routes/studentsRoutes");
const attendanceRouter = require("./routes/attendanceRoutes");
require("dotenv").config();
const errorMiddleWare = require("./middlewares/errorMiddleWare");
const router = require("./routes/teacherRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/students",studentRouter);
app.use("/api/attendance",attendanceRouter);
app.use("/api/teachers",router);
app.use(errorMiddleWare);

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("Mongodb connected");
    app.listen(process.env.PORT,()=>{
        console.log(`Server started at ${process.env.PORT}`);
    })
}).catch((err)=>{console.log(err)});