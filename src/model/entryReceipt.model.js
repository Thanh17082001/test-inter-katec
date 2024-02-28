import query from "../services/db";
class entryMondel{
    async create(entry_receipts){
        const sql = `insert into entry_receipts set ?`
            const result = await query(sql, {...entry_receipts})
            return result
    }

    async createDetail(data){
        const sql = `insert into entry_reciept_detail set ?`
            const result = await query(sql, {...data})
            return result
    }

    async findOne(field, value){
        const sql = `SELECT * FROM entry_receipts WHERE ${field}=?`
        const result = await query(sql, [value])
        return result.length > 0;
    }

    async find(condition={}){
        let sql= `SELECT e.*, u.fullName, u.username FROM entry_receipts e  inner JOIN users u ON e.createBy = u.id ORDER BY e.id DESC;`
        if(Object.keys(condition).length>0){
             sql = `SELECT * FROM entry_receiptss WHERE ?`
        }
        const result = await query(sql,condition)
        return result
    }

    async updateById(id, data){
        const updateKeys = Object.keys(data);
        const setClause = updateKeys.map(key => `${key} = ?`).join(', ');
        const values = updateKeys.map(key => data[key]);
        const sql=`UPDATE entry_receipts SET ${setClause} WHERE id = ?`
        const result = await query(sql,[...values,id])
        return result
    }
}

export default new entryMondel();