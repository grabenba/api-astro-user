import db from '../database/natal-charts.json'
import {writeFile} from "jsonfile"

export default abstract class ChartModel{
    static async getInfo(){
        return  db.info
    }

    static async getAll(){
        return  db.charts
    }
    static async getByName(name:string){
        return  db.charts.find((chart)=>chart.name.toLowerCase().includes(name))
    }
    static async createChart(dataObj:any){
        const {name,birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto}=await dataObj
        db.charts.push({name,birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto})
        await writeFile('./src/database/natal-charts.json',db)
        return{message: 'Chart created successfully',name}
    }

    static async deleteByName(name:string){
        const chartIndex= db.charts.findIndex((chart:any) =>chart.name.toLowerCase()==name)
        const chartToBeDeleted= db.charts[chartIndex]
        if(chartIndex==-1)return {error:'chart not found'}
        db.charts.splice(chartIndex,1)
        await writeFile('./src/database/natal-charts.json', db)
        return {message: 'Deleted successfully',chart: chartToBeDeleted}
    
            
    }

    static async updateByName(dataObj:any){
        const {name,birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto}= await dataObj
        if(name== undefined)return {error:"The name parameter is missing"}
        const foundChartIndex= db.charts.findIndex((chart:any)=>chart.name.toLowerCase()==name.toLowerCase())
        if(foundChartIndex==-1)return {error:"Name doesn't exists in db"}
        const chart=db.charts[foundChartIndex]
        if(birthdate) chart.birthdate=birthdate
        if(time) chart.time=time
        if(asc) chart.asc=asc
        if(sun) chart.sun=sun
        if(moon) chart.moon=moon
        if(mercury) chart.mercury=mercury
        if(venus) chart.venus=venus
        if(mars) chart.mars=mars
        if(jupiter) chart.jupiter=jupiter
        if(saturn) chart.saturn=saturn
        if(uranus) chart.uranus=uranus
        if(neptune) chart.neptune=neptune
        if(pluto) chart.pluto=pluto
        
        await writeFile('./src/database/natal-charts.json', db)
        return{message: 'Updated successfully',chart: chart}
    }
}

