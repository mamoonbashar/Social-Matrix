import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import config from "config";

export async function LoginUser(req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.send("Email or password is incorrect");
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        return res.redirect("/home");
      } else {
        return res.send("email or Password is incorecct");
      }
    });
  } catch (err) {
    console.log(err.message);
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
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.send(err.message);
        } else {
          let user = await userModel.create({
            email,
            password: hash,
            contact,
            fullname,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.redirect('/');
          // return res.redirect("register", { success: true, error: null });
          // let token = generateToken(user);
          // res.cookie("token", token);
          // res.send("user created Succesfully");
          // alert("user created");
        }
      });
    });
  } catch (err) {
    res.render("index", { success: false, error: err.message });
  }
}
