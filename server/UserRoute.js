/*
*  关于用户的接口
* */
const express = require('express');  //引入express
const utility = require('utility');    //用于加密
const Router = express.Router();       //引入express Router中间件
const Model = require('./model')         //引入模型
const User = Model.getModel('User')
const Chat = Model.getModel('Chat')
const _filter = {pwd:0};                  //查询返回过滤

//查询用户
Router.get('/list',function (req,res) {
    // User.remove({},(err,doc)=>{})
    const {type} = req.query
    User.find({type},(err,doc)=>{
        if(!err){
            return res.json({code:0,data:doc})
        }
    })
})
//验证信息
Router.post('/authInfo',function (req,res) {
    //获取cookie
    const userId = req.cookies.userId;
    if(!userId){
        return res.json({code:1})
    }
    const body = req.body;
    console.log(body)
    User.findByIdAndUpdate(userId,body,function (err,doc) {
        console.log(doc)
        if(!doc){
            return res.json({code:1,msg:''})
        }else{
            const data = Object.assign({},{
                name:doc.name,
                type:doc.type
            },body)
            return res.json({code:0,data:data})
        }
    })
})
//登录
Router.post('/login',function (req,res) {
    const { name ,pwd } = req.body;
    User.findOne({name,pwd:md5Pwd(pwd)},_filter,function (err,doc) {
        console.log(doc)
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }else{
            //保存cookie
            res.cookie('userId',doc._id)
            return res.json({code:0,data:doc})
        }
    })
})
//注册
Router.post('/register',function (req,res) {
    console.log(req.body) //获取参数
    const { name ,pwd, type} = req.body;
    //先查询用户是否存在
    User.findOne({name},function (err,doc) {
        if(doc){
            return res.json({code:1,msg:'用户名已存在'});
        }
        //没有就建立用户
        const userModel = new User({name ,type,pwd:md5Pwd(pwd)});
        userModel.save(function (err,doc) {
            if(err){
                return res.json({code:1,msg:'后端出错了'})
            }

            let { name,type,_id } = doc;
            res.cookie('userId',_id);
            return res.json({code:0,data:doc});

        })
        // User.create({name ,type,pwd:md5Pwd(pwd)},function (err,doc) {
        //     if(err){
        //         return res.json({code:1,msg:'后台出错了'})
        //     }else {
        //         return res.json({code:0})
        //     }
        // })
    })
})

Router.get('/info',function (req,res) {
    //获取cookie
    const { userId } = req.cookies;
    if(!userId){
       return res.json({code:1})
    }
    User.findOne({_id:userId},_filter,function (err,doc) {
        if(err){
            return res.json({code:1,msg:"后端出错"})
        }
        return res.json({code:0,data:doc})
    })
})
//获取用户聊天

Router.get('/getmsglist',function (req,res) {
    // Chat.remove({},(err,doc)=>{})
    const userId = req.cookies.userId;
    //先取出所有的用户名称和头像
    User.find({},function (err,userdoc) {
        if(!err){
            let users = {};
            userdoc.forEach(v=>{
                users[v._id]={name:v.name,head:v.head}
            })
            //获取消息
            Chat.find({'$or':[{from:userId},{to:userId}]},function (err,doc) {
                if(!err){
                    res.json({code:0,msgs:doc,users:users})
                }
            })
        }
    })



})


//加盐加密
function md5Pwd(pwd) {
    let salt = "yu_bo_yu_cai_LALA248957@#$%&*";
    return utility.md5(utility.md5(pwd+salt));
}

module.exports = Router;