import { Router } from "express";
import ChartController from "../controllers/chart-controller";

export const chartRouter =Router()
chartRouter.get('/',ChartController.getInfo)
chartRouter.get('/charts',ChartController.getAll)
chartRouter.get('/charts/:name',ChartController.getbyName)

chartRouter.post('/charts',ChartController.createChart)

chartRouter.patch('/charts/:name',ChartController.deleteByName)

chartRouter.delete('/charts/:name',ChartController.deleteByName)
