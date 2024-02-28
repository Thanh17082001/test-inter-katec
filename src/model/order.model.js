import query from "../services/db";
class orderModel{
    async create(order){
        const sql = `insert into orders set ?`
            const result = await query(sql, {...order})
            return result
    }

    async findOne(field, value){
        const sql = `SELECT * FROM orders WHERE ${field}=?`
        const result = await query(sql, [value])
        return result.length > 0;
    }

    async find(condition={}){
        let sql= `SELECT * FROM orders ORDER BY id DESC`
        if(Object.keys(condition).length>0){
             sql = `SELECT * FROM orders WHERE ?`
        }
        const result = await query(sql,condition)
        return result
    }

    async updateById(id, data){
        const updateKeys = Object.keys(data);
        const setClause = updateKeys.map(key => `${key} = ?`).join(', ');
        const values = updateKeys.map(key => data[key]);
        const sql=`UPDATE orders SET ${setClause} WHERE id = ?`
        const result = await query(sql,[...values,id])
        return result
    }
}

export default new orderModel();