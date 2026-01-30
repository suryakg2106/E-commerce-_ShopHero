import { validationResult } from "express-validator";
import { User } from "../Models/Authmodel.js";
import { GenarateToken } from "../Utils/GenerateToken.js";

export const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const user = await User.create({ name, email, password });

    const token = GenarateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        Success: true,
         _id: user._id,
        name: user.name,
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid User" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const token = GenarateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        Success: true,
        _id: user._id,
        name: user.name,
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "lax",
        secure: false, // true if HTTPS
    }).status(200).json({ msg: "Logged out successfully" });
};

