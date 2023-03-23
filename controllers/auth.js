import {db} from "../db.js"


export const register = (req,res)=>{
   
    console.log(req)
    
    const q = "select * from users where email = ? or username = ?"
    db.query(q,[res.body.email,res.body.username],(err,data)=>{
        if(err) return res.json(err)
        if (data.length) return res.status(409).json("User already exist")
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const qu = "insert into users(`username,email,password`) values (?)" 
        const values = [res.body.username,res.body.email,hash]
        db.query(qu,[values],(err,data)=>{
            if (err) return res.json(err)
            // return res.status(200).json("User has been created")
        })
    })
    
}

export const login = (req,res)=>{
    res.json("from controller auth")
}

export const logout = (req,res)=>{
    res.json("from controller auth")
}