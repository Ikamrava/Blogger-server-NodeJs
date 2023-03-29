import {db} from "../db.js"
import jwt from "jsonwebtoken"
import { S3Client ,GetObjectCommand} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv' 

dotenv.config()

export const getPosts =  async (req,res)=>{

    const q = req.query.cat ? 
    "SELECT * FROM posts WHERE cat=?":
    "SELECT * FROM posts"

    db.query(q,[req.query.cat],async (err,data)=>{

        
        const s3 = new S3Client({ 
            region: process.env.BUCKET_REGION,
            credentials : {
              accessKeyId: process.env.ACCESS_KEY,
              secretAccessKey: process.env.SECRET_KEY
            }
           });

           const postData = await data
           for (const item of postData){
              const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: item.image,
               }
            const command =  new GetObjectCommand(getObjectParams);
            const url =  await getSignedUrl(s3, command, { expiresIn: 120 });
            if(url) item.imageurl = url
           }
        
        if (err) return res.send(err)
        
        return res.status(200).json(postData)
    })
}


export const getPost = (req,res)=>{
    const q = "SELECT p.id,p.title,p.uid,p.image,p.date,p.cat,p.description,u.username FROM posts p  JOIN users u ON u.id = p.uid WHERE p.id = ?"
    
    db.query(q,[req.params.id], async (err,data)=>{
        const s3 = new S3Client({ 
            region: process.env.BUCKET_REGION,
            credentials : {
              accessKeyId: process.env.ACCESS_KEY,
              secretAccessKey: process.env.SECRET_KEY
            }
           });

           const postData = await data
           for (const item of postData){
              const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: item.image,
               }
            const command =  new GetObjectCommand(getObjectParams);
            const url =  await getSignedUrl(s3, command, { expiresIn: 120 });
            if(url) item.imageurl = url
           }
        if (err) {
            
            return res.status(500).json(err)}
          
        return res.status(200).json(data)
    })
}


export const addPost = (req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const image = req.body.image
    const cat = req.body.category
    const date = req.body.date
    const token = req.cookies.access_token

    const qu = "INSERT INTO posts(title,description,image,cat,date,uid) Values (?,?,?,?,?,?)" 
        db.query(qu,[title,description,image,cat,date,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json(err)
            return res.json("Post has been created")
        })

    if(!token) return res.status(401).json("Not authentication!")

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        
       if(err) return res.status(403).json("Token is not invalid")
       

    })   
}


export const deletePost = (req,res)=>{
    const token = req.cookies.access_token
   
    if(!token) return res.status(401).json("Not authentication!")
    jwt.verify(token,"jwtkey",(err,userInfo)=>{
       if(err) return res.status(403).json("Token is not invalid")
       const postId = req.params.id
       const q = "Delete from posts where id = ? and uid = ?"
       db.query(q,[postId,userInfo.id],(err,data)=>{
        if(err) return res.status(403).json("You can only delet your posts")
        return res.json("Post Has been deleted")

       })
    })
    

}

export const updatePost = (req,res)=>{
    
    const title = req.body.title
    const description = req.body.description
    const image = req.body.image
    const category = req.body.category
    const date = req.body.date
    const postId = req.params.id
    const token = req.cookies.access_token
    const userId = req.body.uid


    

    if(!token) return res.status(401).json("Not authentication!")

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
       if(err) return res.status(403).json("Token is not invalid")

    const qu = "UPDATE posts SET title =?, description=?,image=?,cat=?,date=? where id = ? AND uid = ? " 
    db.query(qu,[title,description,image,category,date,postId,userId],(err,data)=>{
        if(err) return res.status(403).json(err)
        return res.json("Post has been updated")
    })

    })   
}