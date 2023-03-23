import express from "express"
import {addpost} from "../controllers/post.js"

const router = express.Router()

router.get("/",addpost)

export default router