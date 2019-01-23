/*
*  关于用户的接口
* */
const express = require('express');  //引入express
const utility = require('utility');    //用于加密
const Router = express.Router();       //引入express Router中间件
const Model = require('./model')         //引入模型
const User = Model.getModel('User')
const _filter = {pwd:0};                  //查询返回过滤

//查询用户
Router.get('/list',function (req,res) {
    // User.remove({},(err,doc)=>{})
    User.find({},(err,doc)=>{
        if(!err){
            return res.json(doc)
        }
    })
})
//登录
Router.post('/login',function (req,res) {
    const { name ,pwd } = req.body;
    User.findOne({name,pwd:md5Pwd(pwd)},_filter,function (err,doc) {
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

//加盐加密
function md5Pwd(pwd) {
    let salt = "yu_bo_yu_cai_LALA248957@#$%&*";
    return utility.md5(utility.md5(pwd+salt));
}

module.exports = Router;