import query from "../services/db";
class productModel{
    async create(product){
        const sql = `insert into products set ?`
            const result = await query(sql, {...product})
            return result
    }

    async findOne(field, value){
        const sql = `SELECT * FROM products WHERE ${field}=?`
        const result = await query(sql, [value])
        return result.length > 0;
    }

    async find(condition={}){
        let sql= `SELECT * FROM products ORDER BY id DESC`
        if(Object.keys(condition).length>0){
             sql = `SELECT * FROM products WHERE ?`
        }
        const result = await query(sql,condition)
        return result
    }

    async updateById(id, data){
        const updateKeys = Object.keys(data);
        const setClause = updateKeys.map(key => `${key} = ?`).join(', ');
        const values = updateKeys.map(key => data[key]);
        const sql=`UPDATE products SET ${setClause} WHERE id = ?`
        const result = await query(sql,[...values,id])
        return result
    }
}

export default new productModel();