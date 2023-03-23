import {db} from "./db.js"
import express from 'express'
import * as dotenv from 'dotenv' 
import cors from "cors"




const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())



app.listen(process.env.PORT || "8020",()=>{
  console.log("Running")
})



app.post("/register",(req,res)=>{
  console.log(req.body)
  const q = "select * from users where email = ? or username = ?"
    // db.query(q,[req.body.email,req.body.username],(err,data)=>{
    //     if(err) return res.json(err)
    //     if (data.length) return res.status(409).json("User already exist")
  
        // const salt = bcrypt.genSaltSync(10)
        // const hash = bcrypt.hashSync(req.body.password, salt)

        const qu = "INSERT INTO users(username,email,password) Values (?,?,?)" 
        const values = [req.body.username,req.body.email,req.body.password]
        db.query(qu,[values],(err,data)=>{
            if (err) console.log(err)
            console.log(data)
            // return res.status(200).json("User has been created")
        })
    
    })
  
    









// const data = ""
//   const alldata = async () => {
//     connection.query('SELECT * FROM employee AS data', (error,results) => {
//       return results
//     }).then(results=>{
//       console.log(results)
//     })
//   } 

//   const text = await alldata()






 