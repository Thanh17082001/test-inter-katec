import query from "../services/db";
class priceModel{
    async create(data){
        const sql = `insert into prices set ?`
            const result = await query(sql, {...data})
            return result
    }

    async findOne(field, value){
        const sql = `SELECT * FROM prices WHERE ${field}=?`
        const result = await query(sql, [value])
        return result.length > 0;
    }

    // async find(condition={}){
    //     let sql= `SELECT * FROM prices`
    //     if(Object.keys(condition).length>0){
    //          sql = `SELECT * FROM prices WHERE ?`
    //     }
    //     const result = await query(sql,condition)
    //     return result
    // }

    async findByIdproductAndTypePrice(idProduct, typePrice){
        const sql=`
            SELECT price,typePrice,dateChange
            FROM prices p
            WHERE p.idProduct = ? and typePrice=?
            ORDER BY p.id desc  
            limit 1
        `
        const result = await query(sql, [idProduct,typePrice])
        return result[0]
    }

    async find(idProduct, typePrice){
        const sql=`select * from prices p where idProduct=? and typePrice=? ORDER BY p.id desc`
        const result = await query(sql, [idProduct,typePrice])
        return result
    }


    async updateById(id, data){
        const updateKeys = Object.keys(data);
        const setClause = updateKeys.map(key => `${key} = ?`).join(', ');
        const values = updateKeys.map(key => data[key]);
        const sql=`UPDATE prices SET ${setClause} WHERE id = ?`
        const result = await query(sql,[...values,id])
        return result
    }
}

export default new priceModel();