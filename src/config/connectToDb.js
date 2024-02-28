import mysql from 'mysql2/promise'

const connectToDB =  ()=>{
    try {
       const connection=   mysql.createPool({
            host: "localhost",
            user: "root",
            password: "17082001",
            database: "katec",
            waitForConnections: true,
            connectionLimit:2,
            queueLimit:0,
            debug:false
        })
        console.log('connect To DB successfully');
        return connection;
    } catch (error) {
        console.log('connection failed');
    }
    

}

export default connectToDB()