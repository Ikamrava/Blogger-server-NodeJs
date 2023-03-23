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
    })
  // connection.connect((error)=>{
  //   if(error){
  //    console.log(error)
  //   }else {
      
  //   }
  // })
  
    









// const data = ""
//   const alldata = async () => {
//     connection.query('SELECT * FROM employee AS data', (error,results) => {
//       return results
//     }).then(results=>{
//       console.log(results)
//     })
//   } 

//   const text = await alldata()






 