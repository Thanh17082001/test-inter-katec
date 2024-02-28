import connectToDB from "../config/connectToDb";

const query = async (sql, params)=>{
    try {
        const [rows, fields] = await connectToDB.query(sql, params)
        return rows
        
    } catch (error) {
        console.log(error);
    }
}

export default query;