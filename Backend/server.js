import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors';
import { connectDB } from "./DB/mongoDB.js";
const app = express(); 


// get controllers from controller server
import { registerUser , loginUser , checkAuth , logoutUser} from "./controller/userAuthController.js";
import { checkToken } from './middleware/verifyToken.js';
import { authorizedRole } from './middleware/roleVerify.js';
import { validation } from './middleware/authValidationParse.js';
import { registerSchema , loginSchema } from './validation/authvalidation.js'
import { getAllStudent , createNotice , getNotice , addStudyResource , getStudyResource , createEvent , getAllEvent , getRecentActivity , postStudentQuery , getStudentQuery , respondToQuery} from './controller/facultyController.js'
import {upload} from './utils/multerConfig.js'
 

//configuration 
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true, 
}))
dotenv.config();
app.use("/uploads", express.static("uploads")); 

// Database Connecting
connectDB(process.env.MONGO_URL);

// Routes
app.route("/v1/register").post(validation(registerSchema) ,registerUser);
app.route("/v1/login").post(validation(loginSchema) , loginUser);
app.route("/v1/logout").get(logoutUser)
app.route("/v1/check-auth").get(checkAuth)

// route for faculty service
app.route("/v1/allstudents").get(checkToken , authorizedRole("faculty" , "student") , getAllStudent)
app.route("/v1/getActivity").get(checkToken , getRecentActivity )
// notice
app.route("/v1/notice").post(checkToken , authorizedRole("faculty") , createNotice)
app.route("/v1/getnotice").get(checkToken , authorizedRole("faculty" , "student") , getNotice)
// study resource
app.route("/v1/addstudyresource").post(checkToken , authorizedRole("faculty" , "student"), upload.single("file") , addStudyResource)
app.route("/v1/getstudyresource").get(checkToken , authorizedRole("faculty" , "student") , getStudyResource)
// event 
app.route("/v1/createevent").post(checkToken , authorizedRole("faculty" , "student") , createEvent)
app.route("/v1/getallevents").get(checkToken , authorizedRole("faculty" , "student") , getAllEvent)
// student query
app.route("/v1/studentqueries").post(checkToken , authorizedRole("faculty" , "student") , postStudentQuery);
app.route("/v1/getstudentqueries").get(checkToken , authorizedRole("faculty" , "student") , getStudentQuery);
app.route("/v1/updateQuery/:queryId").patch(checkToken , authorizedRole("faculty" , "student") ,respondToQuery)



// Server Running
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})