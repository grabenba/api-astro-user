import { Router } from "express";
import UserController from "../controllers/user-controllers";


export const userRouter =Router()
userRouter.get('/',UserController.getInfo)
userRouter.get('/users',UserController.getAll)
userRouter.get('/users/:id',UserController.getById)

userRouter.post('/users',UserController.createUser)

userRouter.patch('/users/:id',UserController.updateById)

userRouter.delete('/users/:id',UserController.deleteById)
