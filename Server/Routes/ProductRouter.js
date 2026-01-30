import express from "express";
import { CreateProduct, getAllProduct, getProductbyId, MyProduct, ProductDeatils, updateProduct } from "../Controller/ProductController.js";
import {Protected} from "../Middleware/authMiddleware.js"
import upload from "../Middleware/uploadMiddleware.js";

const Prouter = express.Router();
Prouter.post("/createProduct",Protected,upload.array("images", 5),CreateProduct);
Prouter.get("/getAllProduct",getAllProduct);
Prouter.get("/idget/:id",getProductbyId);
Prouter.put("/up/:id",Protected,updateProduct);
Prouter.get("/my-product",Protected,MyProduct);
Prouter.get("/product/:id",ProductDeatils);


export default Prouter;