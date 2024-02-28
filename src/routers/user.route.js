import express from 'express'
import userController from '../controller/user.controller'

const router = express.Router()
    router.post('/signup', userController.signUp)
    router.post('/signin', userController.signIn)
    router.post('/update', userController.update)
    router.get('/find', userController.getByManager)
    router.get('/logout', userController.logout)
    router.get('/id', userController.getByid)
    router.get('/', userController.getAll)

export default router