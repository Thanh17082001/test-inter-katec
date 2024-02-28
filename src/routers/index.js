import userRouter from './user.route'
import productRouter from './product.route'
import priceRouter from './price.route'
import entryRouter from './entryReceipt.route'
import orderRouter from './order.route'

const routers = (app) =>{
    app.use('/user',userRouter)
    app.use('/product',productRouter)
    app.use('/price',priceRouter)
    app.use('/entry',entryRouter)
    app.use('/order',orderRouter)
    app.use('/', (req, res)=>{
        res.send('Home page')
    })
}

export default routers;