import express from 'express'
import postroutes from "./routes/posts.js"
import register from "./routes/auth.js"
import login from "./routes/auth.js"
import logout from "./routes/auth.js"
import userroutes from "./routes/users.js"
import cors from "cors"
import {db} from "./db.js"



const app = express()


// require("dotenv").config()

// const cors = require("cors")
// app.use(cors())
app.use(express.json())

// app.use("/posts",postroutes)
// app.use("/users",userroutes)
// app.use("/register",register)
app.post("/register",(req,res)=>{
  console.log(req.body)
  // const q = "select * from users where email = ? or username = ?"
  //   db.query(q,[req.body.email,req.body.username],(err,data)=>{
  //       if(err) return res.json(err)
  //       if (data.length) return res.status(409).json("User already exist")
  //       const salt = bcrypt.genSaltSync(10)
  //       const hash = bcrypt.hashSync(req.body.password, salt)

  //       const qu = "insert into users(`username,email,password`) values (?)" 
  //       const values = [req.body.username,req.body.email,hash]
  //       db.query(qu,[values],(err,data)=>{
  //           if (err) return res.json(err)
  //           // return res.status(200).json("User has been created")
  //       })
    // })


    })





app.listen(env.process.PORT,()=>{
  console.log("Running on 3080")
})


