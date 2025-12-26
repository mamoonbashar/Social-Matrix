import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import connectDB from "./config/db.js";
import routes from "./routes/index.route.js";
import authUserRoutes from "./routes/auth.route.js";
import userProfile from "./routes/users.route.js";
import postRoute from "./routes/posts.route.js";
import cookieParser from "cookie-parser";
import path from "path";
// Change from {extended: true} to {extended: true}
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", routes);

app.use("/user", authUserRoutes);

app.use("/profile", userProfile);

app.use("/post", postRoute);

app.listen(process.env.PORT);
console.log("its running on port 5000");

// import crypto from "crypto";

// let JWT_KEY = crypto.randomBytes(64).toString("hex");

// console.log(JWT_KEY)
