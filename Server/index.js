import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import Router from "./Routes/AuthRouter.js";
import Prouter from "./Routes/ProductRouter.js";
import { ConnectDB } from "./Config/ConnectDB.js";
import Cartrouter from "./Routes/CartRouter.js";

const app = express();

// 🔹 DB connect
ConnectDB(process.env.MONGOOURL);
app.use(
  cors({
    origin: function (origin, callback) {
      // allow REST tools & browser
      if (!origin || origin === "http://localhost:5173") {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", Router);
app.use("/", Prouter);
app.use("/",Cartrouter);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
