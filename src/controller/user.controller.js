import userService from "../services/user.service";
import argon2 from 'argon2'

class userController{
    async signUp(req,res){
        try {
            const {username,fullName,password, manager=null} = req.body
            const checkExistUsername = await userService.find({username})
            if(checkExistUsername.length>0){
                res.json({status:false, message:'Đăng ký không thành công, Tên tài khoản tồn tại'})
                return;
            }
            if(!username || !fullName || !password){
                res.json({status:false, message:'Truyền tham số không hợp lệ'})
                return;
            }
            const hashPass = await argon2.hash(password.toString());
            const result = await userService.create({username,fullName,password:hashPass, manager})
            if(!result){
                res.json({status:false, message:'Đăng ký không thành công, tài khoản tồn tại'})
                return;
            }
            res.json({status:true, message:'Đăng ký thành công'})
        } catch (error) {
            console.log(error)
        }
    }
    async getAll(req,res){
        try {
            const result = await userService.findWithJoin()
            res.json(result)
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(req,res){
        try {
            const {username, password} = req.body;
            if(!!req.session.auth){
                res.json({  status:false, message:'Bạn đã đăng nhập'})
                return;
            }
            if(!username){
                res.json({status:false, message:'Truyền tham số không hợp lệ'})
                return;
            }
            const existUsername = await userService.checkExist(username)
            if(!!existUsername && Object.keys(existUsername).length>0){
                const passVerify= await argon2.verify(existUsername.password, password.toString())
                if(passVerify){
                    req.session.auth={
                        ...existUsername
                    }
                    res.json({status:true, message:'Đăng nhập thành công', auth:req.session.auth})
                }
                else{
                    res.json({status:false,message:'Sai tài khoản hoặc mật khẩu'})
                }
            }
            else{
                console.log('aaa');
                res.json({status:false,message:'Sai tài khoản hoặc mật khẩu'})
            }

        } catch (error) {
            console.log(error)
        }
    }

    logout(req, res){
        if(!!!req.session.auth){
            res.json({status:false,message:'Bạn chưa đăng nhập'})
        }
        else{
            req.session.auth=undefined
            res.json({status:true,message:'Đăng xuất'})
        }
    }

    async getByManager(req,res){
        try {
            const {manager} = req.query
            const result = await userService.finByManager(manager)
            res.json(result)
        } catch (error) {
           console.log(error); 
        }
    }
    async getByid(req, res){
        try {
            const {id} = req.query
            const result = await userService.find({id})
            res.json(result)
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res){
        try {
            const data=req.body
            const {id}=req.query
            const checkExistUsername = await userService.find({username:data.username})
            if(checkExistUsername.length>0){
                res.json({status:false, message:'Cập nhật không thành công, Tên tài khoản tồn tại hoặc chưa thay đổi dữ liệu'})
                return;
            }
            const result = await userService.updateById(id,data)
            if(result.affectedRows>0){
                if(result.changedRows==0){
                    res.json({status:false,message:'Chưa thay đổi dữ liệu'})
                }else{
                    const update =  await userService.find({id})
                    res.json({status:true,message:'Thay đổi thành công', data:update[0]})
                }
            }
           else{
                res.json({status:false,message:'Cập nhật thất bại'})
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new userController()