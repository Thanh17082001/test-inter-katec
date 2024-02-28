import express from 'express'
import priceController from '../controller/price.controller'

const router = express.Router()
    router.post('/create', priceController.createPriceSale)
    // router.post('/signin', priceController.signIn)
    // router.post('/update', priceController.update)
    router.get('/find', priceController.getByIdProductAndTypePrice)
    router.get('/product', priceController.findPriceByIdProduct)
    // router.get('/logout', priceController.logout)
    // router.get('/id', priceController.getByid)
    // router.get('/', priceController.getAll)

export default router