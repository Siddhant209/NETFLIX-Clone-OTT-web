const mongoose = require("mongoose");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
exports.Logout = async (req, res) => {
  try {
    // Clear the cookie that stores the token
    console.log(req.params.id)
    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Failed to logout",
      error,
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    const token = signToken(user._id);
    return res.status(200).cookie("token",token).json({
      staus: "success",
      message: "User is Login successfully",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "error",
      message: "Invalid Email OR Password",
    });
  }
};
exports.Register = async (req, res) => {
  try {
    const { FullName, Email, Password } = req.body;
    if (!FullName || !Email || !Password) {
      return res.status(401).json({
        message: "invalid data",
      });
    }
    const user = await User.findOne({ Email });
    if (user) {
      return res.status(401).json({
        message: "this email is already used",
      });
    }
    // convert password to hashpassword using bcrypt
    const hashpassword = await bcrypt.hash(Password, 12);
    await User.create({
      FullName,
      Email,
      Password: hashpassword,
    });
    return res.status(200).json({
      message: "User is created successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getDate = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
    });
  }
};
