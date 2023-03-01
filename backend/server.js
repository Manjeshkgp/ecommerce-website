import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
// import path from "path";
// import cookieSession from "cookie-session";
import expressSession from "express-session";
import dotenv from "dotenv";
import connect from "./database/mongodb.js";
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import passport from "passport";
import passportSetup, { GoogleAuth } from "./config/passport.js";

dotenv.config();
const app = express();
app.use(
  expressSession({
    name: "expressSession",
    saveUninitialized: true,
    resave: false,
    secret: "irx826",
    cookie: { secure: true },
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportSetup(passport);
GoogleAuth;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const __dirname = fileURLToPath(new URL(".", import.meta.url));
await connect();

app.get("/", (req, res) => {
  res.json({ message: "Hello and welcome" });
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/sellers", sellerRoute);
app.use("/admin", adminRoute);
app.use("/*", (req, res) => res.json({ message: "Wrong URL 404" }));

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
