import priceModel from "../model/price.model";

class priceController{
    async createPriceSale(req, res){
        try {
            const data = req.body
            const result = await priceModel.create(data)
            res.json(result)
        } catch (error) {
           console.log(error); 
        }
    }

    async getByIdProductAndTypePrice(req, res){
        try {
            const {idProduct, typePrice} = req.query
            console.log(typePrice);
            const result = await priceModel.find(Number(idProduct),typePrice.toString())
            res.json(result)
        } catch (error) {
            console.log(error);
        }
    }

    async findPriceByIdProduct(req, res){
        try {
            const {idProduct, typePrice} = req.query
            const result = await priceModel.findByIdproductAndTypePrice(idProduct,typePrice)
            res.json(result)
        } catch (error) {
           console.log(error); 
        }
    }
}

export default new priceController( );