import jwt from "jsonwebtoken";
import { User } from "../Models/Authmodel.js";

export const Protected = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "no token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
     if (!req.user) {
      return res.status(404).json({ msg: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};