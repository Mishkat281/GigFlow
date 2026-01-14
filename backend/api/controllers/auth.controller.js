import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10); // hashing password with bcrypt to enhance security
    const newUser = new User({
      ...req.body, // spread operator to copy all properties from req.body
      password: hash, // overwrite password with hashed password
    });

    await newUser.save();
    res
      .status(201)
      .send({ Status: "Success", Message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(400, "Wrong password or username"));
    } 

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
         sameSite: "none",
  secure: true
        
      })
      .status(200)
      .send({ Status: "Success", Message: "Login successful", Data: info,  accessToken: token });

  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
    res
    .clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
    })
    .status(200)
    .send({ Status: "Success", Message: "Logout successful" });
};
