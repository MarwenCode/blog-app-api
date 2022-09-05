// const router = require("express").Router();
import express from "express";
import User from "../models/User.js";
const authRoute = express.Router();
import bcrypt from "bcrypt";

//Register
authRoute.post("/register", async (req, res) => {
  try {
    //to use bcrypt tp hash the password we need to use this:
    //generate new password
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      // password: hashedPassword,
      password: req.body.password,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//login
authRoute.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("wrong email");

    //to use bcrypt tp hash the password we need to use this:

    // const validated = await bcrypt.compare(req.body.password, user.password);
    // !validated && res.status(400).json("wrong password")

    //for not sending the passWord on MongDB we need to exculed
    // const {password, ...otherElements } = user._doc

    // res.status(200).json(otherElements)

    res.status(200).json(user);
    console.log(req.body);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default authRoute;
