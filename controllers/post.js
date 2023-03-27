import {db} from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req,res)=>{
    const q = req.query.cat ? 
    "SELECT * FROM posts WHERE cat=?":
    "SELECT * FROM posts"

    db.query(q,[req.query.cat],(err,data)=>{
        if (err) return res.send(err)
        return res.status(200).json(data)
    })
    
}


export const getPost = (req,res)=>{
    const q = "SELECT * FROM posts p JOIN users u ON u.id=p.uid WHERE p.id = ?"
    
    db.query(q,[req.params.id],(err,data)=>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}


export const addPost = (req,res)=>{
    console.log(req.body)

    const title = req.body.title
    const description = req.body.description
    const image = req.body.image
    const cat = req.body.category
    const date = req.body.date
    

    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authentication!")

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        console.log(userInfo.id)
       if(err) return res.status(403).json("Token is not invalid")
       

       const qu = "INSERT INTO posts(title,description,image,cat,date,uid) Values (?,?,?,?,?,?)" 
        db.query(qu,[title,description,image,cat,date,userInfo.id],(err,data)=>{
            if (err) console.log(err)
            return res.json("Post has been created")
        })

    })   
}


export const deletPost = (req,res)=>{
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
    const image = req.body.image.name
    const category = req.body.category
    const date = req.body.date
    const postId = req.params.id
    if(!token) return res.status(401).json("Not authentication!")

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
       if(err) return res.status(403).json("Token is not invalid")

       const qu = "UPDATE posts SET title =?, description=?,image=?,cat=?,date=? where id = ? AND uid = ? " 
        db.query(qu,[title,description,image,category,date,postId,userInfo.id],(err,data)=>{
            if (err) console.log(err)
            return res.jason("Post has been updated")
        })

    })   
}