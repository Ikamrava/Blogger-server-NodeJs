
import express from 'express'
import dotenv from 'dotenv' 
import cors from "cors"
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import { S3Client , PutObjectCommand} from "@aws-sdk/client-s3"
import multer from "multer";
import multerS3 from "multer-s3"
import { nanoid } from 'nanoid'
import path from "path"





dotenv.config()
const app = express()
app.use(express.json())
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



const storage = multer.memoryStorage()
const upload = multer({storage:storage})


const s3 = new S3Client({ 
  region: process.env.BUCKET_REGION,
  credentials : {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  }
 });

 app.post("/uploads",upload.single("file"),async (req,res)=>{
  console.log(req.body)
  console.log(req.file)
  
  const prams = {
    Bucket: process.env.BUCKET_NAME,
    Key: Date.now() + req.file.originalname,
    Bodu: req.file.buffer,
    ContentType: req.file.mimetype

  }

  const command = new PutObjectCommand(prams)

  await s3.send(command )
  const file = req.file;
  res.status(200).json(Date.now() + file.originalname);


 })


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage });

// app.post("/uploads", upload.single("file"), function (req, res) {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });





   



  
    












 