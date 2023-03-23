import express from "express"
import {adduser} from "../controllers/user.js"

const router = express.Router()

router.get("/",adduser)

export default router