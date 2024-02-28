import express from 'express'
import entryReceiptController from '../controller/entryReceipt.controller'

const router = express.Router()
    router.post('/create', entryReceiptController.create)
    // router.post('/signin', entryReceiptController.signIn)
    // router.post('/update', entryReceiptController.update)
    // // router.get('/find', entryReceiptController.getByManager)
    // // router.get('/logout', entryReceiptController.logout)
    // router.get('/id', entryReceiptController.getById)
    router.get('/', entryReceiptController.getAll)

export default router