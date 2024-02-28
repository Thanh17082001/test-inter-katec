import entryReceiptModel from "../model/entryReceipt.model";
import priceModel from '../model/price.model'
import productModel from '../model/product.model'
class entryReceiptController{
    async create(req, res){
        try {
            const data = req.body
            const products= data.products
            const dataEntry= {
                createBy:data.createBy,
                totalAmout:data.totalAmout,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const result = await entryReceiptModel.create(dataEntry)
            let check
            for(let i=0;i<products.length;i++){
                const detail={
                    entryId:result?.insertId,
                    productId:products[i].idProduct,
                    quantityImport:products[i].quantityImport,
                    priceImport:products[i].priceImport,
                }
                check= await entryReceiptModel.createDetail(detail)
                        await priceModel.create({idProduct:products[i].idProduct,typePrice:'Nhap',price:products[i].priceImport, dateChange:new Date()})
                        const product = await productModel.find({id:products[i].idProduct})
                        await productModel.updateById(products[i].idProduct,{quantityImport:products[i].quantityImport+product[0].quantityImport})
            }
            if(check?.affectedRows>0){
                res.json({status:true, message:'Thêm thành công'});
            }
        } catch (error) {
           console.log(error); 
        }
    }



    async getAll(req, res){
        try {
            const result = await entryReceiptModel.find()
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    async getById(req, res){
        try {
            const {id}=req.query
            const result = await entryReceiptModel.find({id})
            res.json(result)
        } catch (error) {
            console.log(error);
        }
    }


    async update(req, res){
        try {
            console.log('aaaa');
            const data=req.body
            const {id}=req.query
            const priceOld = data.price ? await priceModel.findByIdproductAndTypePrice(id,'Ban') : undefined
            console.log(priceOld);
            const result = await entryReceiptModel.updateById(id,{name:data.name, image:data.image})
            if(result?.affectedRows>0 || data.price){
                if( result.changedRows==0 && priceOld?.price === data.price ){
                    res.json({status:false,message:'Chưa thay đổi dữ liệu'})
                }else{
                    if(data.price){
                        const day = new Date()
                        await priceModel.create({idProduct:id,typePrice:'Ban',price:data.price, dateChange:day})
                    }
                    const update =  await entryReceiptModel.find({id})
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

export default new entryReceiptController(   );