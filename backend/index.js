import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(express.json()); 
import cors from "cors"
import cookieParser from "cookie-parser"
import { dirname } from 'path';
import { fileURLToPath } from "url"; 
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import connectDB from "./config/connectDB.js"
import userRouter from "./routes/user.route.js"
import shopRouter from "./routes/shop.route.js"
import aiRouter from "./routes/messageai.route.js";
import fcmtokenRouter from "./routes/fcmtoken.route.js";
import notificationScheduler from "./services/notificationScheduler.js";

// app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//it is very very important 
//without this I was not able to fetch links in frontend
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true, // if using cookies/auth
  })
);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user",userRouter)
app.use("/api/shops",shopRouter)
app.use("/api/ai",aiRouter)
app.use("/api/notification",fcmtokenRouter)




connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    // notificationScheduler.start();
} )
}).catch((error)=>{
    console.log(error)
})