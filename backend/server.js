import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import {fileURLToPath} from "url";
// import path from "path";
import dotenv from "dotenv";
import connect from "./database/mongodb.js";
import userRoute from "./routes/userRoute.js"

dotenv.config();
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const __dirname = fileURLToPath(new URL(".", import.meta.url));
await connect();

app.get("/",(req,res)=>{
    res.json({"message":"Hello and welcome"});
})

app.use("/users",userRoute);
app.use("/*",(req,res)=>res.json({"message":"Wrong URL 404"}));

app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})