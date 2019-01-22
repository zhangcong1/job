/*
*  关于用户的接口
* */
const express = require('express');  //引入express
const Router = express.Router();       //引入express Router中间件
const Model = require('./model')         //引入模型
const User = Model.getModel('User')

//查询用户
Router.get('/list',function (req,res) {
    User.findOne({},(err,doc)=>{
        if(!err){
            return res.json(doc)
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
        User.create({name ,pwd, type},function (err,doc) {
            if(err){
                return res.json({code:1,msg:'后台出错了'})
            }else {
                return res.json({code:0})
            }
        })
    })
})

Router.get('/info',function (req,res) {
    return res.json({code:1})
})

module.exports = Router;