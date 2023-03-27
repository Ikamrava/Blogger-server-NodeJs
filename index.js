
import express from 'express'
import * as dotenv from 'dotenv' 
import cors from "cors"
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";





const app = express()
app.use(express.json())
dotenv.config()
app.use(cookieParser());

app.use(cors({
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);





app.listen(process.env.PORT || "8020",()=>{
  console.log("Running")
})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/uploads", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});



  
    












 