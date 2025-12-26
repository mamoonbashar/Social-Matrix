import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function isLoggedIn(req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "login First");
    res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    // Finds the email in in db and match to you token email
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    //   assing the data to user
    req.user = user;
    next();
  } catch (err) {
    if (err) {
      req.flash("error", "Token expired or invalid please login again");
      res.redirect("/");
    }
  }
}
