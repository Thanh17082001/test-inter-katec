import express from 'express'
import productController from '../controller/product.controller'

const router = express.Router()
    router.post('/create', productController.create)
    // router.post('/signin', productController.signIn)
    router.post('/update', productController.update)
    // router.get('/find', productController.getByManager)
    // router.get('/logout', productController.logout)
    router.get('/id', productController.getById)
    router.get('/', productController.getAll)

export default router