import {db} from "./db.js"
import express from 'express'
import * as dotenv from 'dotenv' 



const app = express()
app.use(express.json())
dotenv.config()



app.listen(process.env.PORT || "8020",()=>{
  console.log("Running")
})



app.post("/register",(req,res)=>{
  console.log(req.body)
  const q = "select * from users where email = ? or username = ?"
    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if (data.length) return res.status(409).json("User already exist")
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const qu = "insert into users(`username,email,password`) values (?)" 
        const values = [req.body.username,req.body.email,hash]
        db.query(qu,[values],(err,data)=>{
            if (err) return res.json(err)
            // return res.status(200).json("User has been created")
        })
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






 