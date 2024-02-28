import query from "../services/db";
class order_detailDetailModel{
    async create(order_detail){
        const sql = `insert into order_detail set ?`
            const result = await query(sql, {...order_detail})
            return result
    }

    async findOne(field, value){
        const sql = `SELECT * FROM order_detail WHERE ${field}=?`
        const result = await query(sql, [value])
        return result.length > 0;
    }

    async find(condition={}){
        let sql= `SELECT * FROM order_detail order_detail BY id DESC`
        if(Object.keys(condition).length>0){
             sql = `SELECT * FROM order_detail WHERE ?`
        }
        const result = await query(sql,condition)
        return result
    }

    async updateById(id, data){
        const updateKeys = Object.keys(data);
        const setClause = updateKeys.map(key => `${key} = ?`).join(', ');
        const values = updateKeys.map(key => data[key]);
        const sql=`UPDATE order_details SET ${setClause} WHERE id = ?`
        const result = await query(sql,[...values,id])
        return result
    }
}

export default new order_detailDetailModel();