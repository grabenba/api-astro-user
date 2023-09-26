import ChartModel from "../models/chart-model"
//aca me traigo el tipo 
import { Request,Response } from "express"

export default abstract class ChartController{
    static async getInfo(req:Request, res:Response){
        const info= await ChartModel.getInfo()
        res.status(200).json(info)
    }

    static async getAll(req:Request,res:Response){
        const charts = await ChartModel.getAll()
         res.status(200).json(charts)
    }

    static async getbyName(req:Request, res:Response){
        const {name}=req.params
        const nameFound=await ChartModel.getByName(name.toLowerCase())
        if(!nameFound) return res.status(404).json({error:'Error name not found'})
        res.status(200).json(nameFound)
    }
    static async createChart(req:Request,res:Response){
        const{name,birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto}=req.body
        const chart = await ChartModel.createChart({name,birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto})
        res.status(201).json(chart)
    }

    static async deleteByName (req:Request, res:Response){
        const {name}=req.params
        const chartDeleted=await ChartModel.deleteByName(name.toLowerCase())
        if (chartDeleted.error)
			return res.status(404).json(chartDeleted);

		 res.status(200).json(chartDeleted);
    }

    static async updateByName(req:Request,res:Response){
        const{name,birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto}=await req.body
        const updatedChart=await ChartModel.updateByName({name,birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto})
        res.status(201).json(updatedChart)
    }
}