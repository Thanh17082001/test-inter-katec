import orderModel from "../model/order.model";
import productModel from "../model/product.model";
import orderDetailModel from "../model/orderDetail.model";
import userService from "../services/user.service"

class orderController{
    async create(req, res){
        try {
            const data = req.body
            const order={
                createBy: data.createBy || null,
                customer: data.customer,
                phone:data.phone ,
                address:data.address,
                order_date:new Date(),
                totalAmount:data.totalAmount
            }
            const products = [...data.products]
            const result = await orderModel.create(order)
            if(result?.affectedRows>0){
                products.forEach(async (product) => {
                    const orderDetai={
                        idOrder:result?.insertId,
                        idProduct:product.id ,
                        quantity:product.quantity ,
                        price:product.priceSale ,
                    }
                    await orderDetailModel.create(orderDetai)
                    const itemProduct = await productModel.find({id:product.id})
                    const update={quantityImport:itemProduct[0].quantityImport-product.quantity, quantitySale:itemProduct[0].quantitySale+ product.quantity}
                    await productModel.updateById(product.id, update)
                })
                res.json({status:true, message:'Thêm đơn hàng thành công', idOrder:result?.insertId})
            }
        } catch (error) {
           console.log(error); 
        }
    }

    async getAll(req, res){
        try {
            const result = await orderModel.find()
            const data=[]
            for(let i = 0;i<result.length;i++){
                const orderDetail = await orderDetailModel.find({idOrder:result[i].id})
                const product = await productModel.find({id:orderDetail[0].idProduct})
                const user = await userService.find({id:result[i].createBy})
                data.push({
                    ...result[i],
                    createBy:{...user[0]},
                  products:[
                    {
                        ...orderDetail[0],
                        ...product[0],
                    }
                  ]
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
            const result = await orderModel.find({id})
            const user = await userService.find({id:result[0].createBy})
            const products=[]
            const data=[]
                const orderDetail = await orderDetailModel.find({idOrder:id})
                for(let i=0; i<orderDetail.length;i++){
                    const product = await productModel.find({id:orderDetail[i].idProduct})
                    products.push({
                        ...orderDetail[i],
                        ...product[0],
                    })
                }
                data.push({
                    ...result[0],
                    createBy:{...user[0]},
                    products:products
                })
            res.json(data[0])
        } catch (error) {
            console.log(error);
        }
    }


    async update(req, res){
        try {
            const data=req.body
            const {id}=req.query
            const result = await orderModel.updateById(id,data)
            if(result?.affectedRows>0 ){
                 res.json({status:true,message:'Thay đổi thành công'})
            }
           else{
                res.json({status:false,message:'Cập nhật thất bại'})
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getByIdUser(req, res){
        try {
            const {idUser}=req.query
            const products=[]
            const data=[]
            const user = await userService.find({id:idUser})
            const result = await orderModel.find({createBy: idUser})
            for(let i=0;i<result.length;i++){
                const orderDetail = await orderDetailModel.find({idOrder:result[i].id})
                for(let j=0; j<orderDetail.length;j++){
                    const product = await productModel.find({id:orderDetail[j].idProduct})
                    products.push({
                        ...orderDetail[j],
                        ...product[0],
                    })
                }
                data.push({
                    ...result[i],
                    createBy:{...user[0]},
                    products:products
                })
            }
            res.json(data)
        } catch (error) {
            console.log(error);
        }
    }

}

export default new orderController();