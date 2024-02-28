import userModel from "../model/user.model";

class userService{
    async create(data){
        const existUsername = await userModel.findOne('username', data.username)
        if(existUsername){
            return false;
        }
        else{
            const result = await userModel.create(data)
            return result
        }
    }

    async find(condition={}){
        return await userModel.find(condition)
    }

    async findWithJoin(condition={}){
        return await userModel.findWithJoin(condition)
    }
    async finByManager(manager){
        return await userModel.findByManager(manager)
    }

    async checkExist(username){
        const result= await userModel.find({username})
        return result[0];
    }

    async updateById(id,data){
        return await userModel.updateById(id,data)
    }
}

export default new userService()