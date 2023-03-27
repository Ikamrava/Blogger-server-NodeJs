import express from "express"
import {addPost, deletPost, getPost, getPosts, updatePost} from "../controllers/post.js"

const router = express.Router()

router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/",addPost)
router.delete("/:id",deletPost)
router.put("/:id",updatePost)

export default router