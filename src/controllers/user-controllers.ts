
//aca me traigo el tipo 
import { Request,Response } from "express"
import UserModel from "../models/user-model"

export default abstract class UserController{
    static async getInfo(req:Request, res:Response){
        const info= await UserModel.getInfo()
        res.status(200).json(info)
    }

    static async getAll(req:Request,res:Response){
        const charts = await UserModel.getAll()
         res.status(200).json(charts)
    }

    static async getById(req:Request, res:Response){
        const {id}=req.params
        const idFound=await UserModel.getById(id)
        if(!idFound) return res.status(404).json({error:'Error id not found'})
        res.status(200).json(idFound)
    }
    static async createUser(req:Request,res:Response){
        const{name,email}=req.body
        const chart = await UserModel.createUser({name,email})
        res.status(201).json(chart)
    }

    static async deleteById (req:Request, res:Response){
        const {id}=req.params
        const userDeleted=await UserModel.deleteById(id)
        if (userDeleted.error)
			return res.status(404).json(userDeleted);

		 res.status(200).json(userDeleted);
    }

    static async updateById(req:Request,res:Response){
        const{id,name,email}=await req.body
        const updatedUser=await UserModel.updateById({id,name,email})
        res.status(201).json(updatedUser)
    }
}