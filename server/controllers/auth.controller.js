import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// Helper Fro Cookie
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  path: "/",
  httpOnly: true,
  secure: isProduction,
  sameSite: "Lax",
  maxAge: 24 * 60 * 60 * 1000,
};

export async function LoginUser(req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = generateToken(user);
      res.cookie("token", token, cookieOptions);
      res
        .status(200)
        .json({ message: "Logged in Successfully", success: true });
    } else {
      return res
        .status(403)
        .json({ message: "Email or Password is incorrect" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", Error: err.message });
  }
}

export async function registerUser(req, res) {
  try {
    let { email, password, fullname, contact } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.render("index", {
        success: false,
        error: "User already exists",
      });
    }

    const Salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, Salt);

    let createUser = await userModel.create({
      email,
      password: hashPassword,
      contact,
      fullname,
    });
    let token = generateToken(createUser);

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({ message: "User Registered", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

export async function logout(req, res) {
  try {
    const { maxAge, ...clearCookie } = cookieOptions;
    res.clearCookie("token", clearCookie);
    res
      .status(200)
      .json({ message: "You are logged out Successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
