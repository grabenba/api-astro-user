import db from '../database/user.json'
import {randomUUID} from "node:crypto"
import {writeFile} from "jsonfile"

export default abstract class UserModel{
    static async getInfo(){
        return  db.info
    }

    static async getAll(){
        return  db.users
    }
    static async getById(id:string){
        return  db.users.find((user)=>user.id==id)
    }
    static async createUser(dataObj:any){
        const {name,email}=await dataObj
        const id = randomUUID()
        db.users.push({id,name,email})
        await writeFile('./src/database/user.json',db)
        return{message: 'user created successfully',id}
    }

    static async deleteById(id:string){
        const userIndex= db.users.findIndex((user:any) =>user.id ==id)
        const userToBeDeleted= db.users[userIndex]
        if(userIndex==-1)return {error:'user not found'}
        db.users.splice(userIndex,1)
        await writeFile('./src/database/user.json', db)
        return {message: 'Deleted successfully',user: userToBeDeleted}
    
            
    }

    static async updateById(dataObj:any){
        const {id,name,email}= await dataObj
        if(id== undefined)return {error:"The name parameter is missing"}
        const foundUserIndex= db.users.findIndex((user:any)=>user.id==id)
        if(foundUserIndex==-1)return {error:"ID doesn't exists in db"}
        const user=db.users[foundUserIndex]
        if(name) user.name=name
        if(email) user.email=email
        
        await writeFile('./src/database/user.json', db)
        return{message: 'Updated successfully',user: user}
    }
}

