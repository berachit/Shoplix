import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"
import { googleAuth } from "../controllers/googleAuth.controller.js"

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/google', googleAuth)   // ← POST /api/user/google

export default userRouter;