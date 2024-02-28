import query from "../services/db";

class userModel{
    async create(user){
        const sql = `insert into users set ?`
            const result = await query(sql, {...user})
            return result
    }

    async findOne(field, value){
        const sql = `SELECT * FROM users WHERE ${field}=?`
        const result = await query(sql, [value])
        return result.length > 0;
    }

    async find(condition={}){
        let sql= `SELECT * FROM users`
        if(Object.keys(condition).length>0){
             sql = `SELECT * FROM users WHERE ?`
          
        }
        const result = await query(sql,condition)
        return result
    }

    async findWithJoin(condition={}){
        let sql= ` SELECT u.id AS id,
        u.username AS username,
        u.fullName AS fullName,
        u.manager AS manager,
        m.username AS managerName,
        m.fullName AS managerFullName
    FROM users u 
    INNER JOIN users m 
    ON u.manager=m.id  
    `
        if(Object.keys(condition).length>0){
             sql = ` SELECT u.id AS id,
             u.username AS username,
             u.fullName AS fullName,
             u.manager AS manager,
             m.username AS managerName,
             m.fullName AS managerFullName
         FROM users u 
         INNER JOIN users m 
         ON u.manager=m.id  
         WHERE ?`
          
        }
        const result = await query(sql,condition)
        return result
    }

    async findByManager(manager){
        const sql =`
        SELECT u.id AS id,
            u.username AS username,
            u.fullName AS fullName,
            u.manager AS manager,
            m.username AS managerName,
            m.fullName AS managerFullName
        FROM users u 
        INNER JOIN users m 
        ON u.manager=m.id  
        WHERE u.manager = ${manager}`
        const result = await query(sql)
        return result
    }

    async updateById(id, data){
        const updateKeys = Object.keys(data);
        const setClause = updateKeys.map(key => `${key} = ?`).join(', ');
        const values = updateKeys.map(key => data[key]);
        const sql=`UPDATE users SET ${setClause} WHERE id = ?`
        const result = await query(sql,[...values,id])
        return result
    }
}

export default new userModel();