
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"


// require("dotenv").config()

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log("images", __dirname);

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//middlewares
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use(cors())

app.get("/", (req, res) => {
  res.send('hello to Blog-app API')
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connect();
  console.log("connected to backend");
}); 


