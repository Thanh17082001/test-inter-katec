import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import session from 'express-session'
import routers from './routers/index'
import socketIo from './config/socket.io'
const app = express()

app.use(cors({origin:'http://localhost:3001', credentials:true,}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

const expressServer=app.listen(5000,()=>{console.log('Server running with post 5000');})
// create and config socket.io
const io = new Server(expressServer, {
  cors:{
    origin:'http://localhost:3001'
  }
})

io.on('connection',(client)=>{
  client.on('order',(id)=>{
    io.emit('order-alert',{message:'Đặt hàng thành công', idOder:id})
  })
})


app.use(socketIo(io))

routers(app)
