import express from "express";
import { addCart, GetCart } from "../Controller/CartController.js";
import {Protected} from "../Middleware/authMiddleware.js"

const Cartrouter = express.Router();

Cartrouter.post("/add", Protected, addCart);
Cartrouter.get("/get",Protected,GetCart);

export default Cartrouter;
