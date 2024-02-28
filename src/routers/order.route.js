import express from 'express'
import orderController from '../controller/orderController'
const router = express.Router()


router.post('/create', orderController.create)
router.post('/update', orderController.update)
router.get('/id',orderController.getById)
router.get('/id-user',orderController.getByIdUser) //?idUser
router.get('/',orderController.getAll)
export default router