

const socketIo = (io) => (req, res, next)=>{
     req.io=io;
     next()
}

export default socketIo;