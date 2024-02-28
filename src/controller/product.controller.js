import priceModel from "../model/price.model";
import productModel from "../model/product.model";

class productController{
    async create(req, res){
        try {
            const data = req.body
            const result = await productModel.create(data)
            if(result.affectedRows>0){
                res.json({status:true, message:'Thêm sản phẩm thành công'})

            }
        } catch (error) {
           console.log(error); 
        }
    }

    async getAll(req, res){
        try {
            const result = await productModel.find()
            const data=[]
            for(let i = 0;i<result.length;i++){
                const priceImport = await priceModel.findByIdproductAndTypePrice(result[i].id, 'Nhap')
                const priceSale = await priceModel.findByIdproductAndTypePrice(result[i].id, 'Ban')
                data.push({
                    ...result[i],
                    priceImport:priceImport?.price || 0,
                    priceSale:priceSale?.price || 0,
                })
            }
            res.json(data);
        } catch (error) {
            console.log(error);
        }
    }

    async getById(req, res){
        try {
            const {id}=req.query
            const result = await productModel.find({id})
            res.json(result)
        } catch (error) {
            console.log(error);
        }
    }


    async update(req, res){
        try {
            const data=req.body
            const {id}=req.query
            const priceOld = data.price ? await priceModel.findByIdproductAndTypePrice(id,'Ban') : undefined
            const result = await productModel.updateById(id,{name:data.name, image:data.image})
            if(result?.affectedRows>0 || data.price){
                if( result.changedRows==0 && priceOld?.price === data.price ){
                    res.json({status:false,message:'Chưa thay đổi dữ liệu'})
                }else{
                    if(data.price){
                        const day = new Date()
                        await priceModel.create({idProduct:id,typePrice:'Ban',price:data.price, dateChange:day})
                    }
                    const update =  await productModel.find({id})
                    res.json({status:true,message:'Thay đổi thành công', data:update[0]})
                }
            }
           else{
                res.json({status:false,message:'Cập nhật thất bại'})
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new productController();