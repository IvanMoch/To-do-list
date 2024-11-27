import { Router } from "express";
import { UserController } from "../Controller/userController.js";

export const userRouter = new Router()

userRouter.get('/:username', UserController.getUserInf)
userRouter.post('/register', UserController.insertUser)
userRouter.post('/login', UserController.logUser)
userRouter.post('/logout', UserController.logout)
userRouter.patch('/id/:id', UserController.modifyUser)