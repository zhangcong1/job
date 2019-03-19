/*
*  关于用户的接口
* */
const express = require('express');  //引入express
const utility = require('utility');    //用于加密
const Router = express.Router();       //引入express Router中间件
// const Model = require('./model')         //引入模型
// const User = Model.getModel('User')
// const Chat = Model.getModel('Chat')
const _filter = {pwd:0};                  //查询返回过滤

const mysql = require('./mysql')

//查询用户
Router.get('/list',function (req,res) {
    // User.remove({},(err,doc)=>{})
    const {type} = req.query
    mysql.query(`select * from user where types='${type}'`,(err,ret)=>{
        if(!err){
            return res.json({code:0,data:ret})
        }
    })
    /*User.find({type},(err,doc)=>{
        if(!err){
            return res.json({code:0,data:doc})
        }
    })*/
})
//验证信息
Router.post('/authInfo',function (req,res) {
    //获取cookie
    const userId = req.cookies.userId;
    if(!userId){
        return res.json({code:1})
    }
    const body = req.body;
    mysql.query(`update user set titles = '${body.title}',heads = '${body.head}',company = '${body.company}',money = '${body.money}',descs = '${body.desc}' where uid = ${userId}`,function (error,result) {
        console.log(result)
        if (error){
            return res.json(error);
        } else {
            mysql.query(`select * from user where uid = ${userId}`,function (err,ret) {
                if (err){
                    return res.json({code:1,msg:'后端出错了'})
                } else {
                    const data = Object.assign({},{
                        name:ret[0].account,
                        type:ret[0].types
                    },body)
                    return res.json({code:0,data:ret[0]})
                }
            })
        }
    })
    /*User.findByIdAndUpdate(userId,body,function (err,doc) {
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
    })*/
})
//登录
Router.post('/login',function (req,res) {
    const { name ,pwd } = req.body;
    mysql.query(`select * from user where account='${name}' and password='${pwd}'`,function (error,result) {
        if (error){
            return res.json(error);
        } else {
            res.cookie('userId',result[0].uid)
            let data = {code:0,data:result[0]}
            return res.json(data)
        }
    })
    /*User.findOne({name,pwd:md5Pwd(pwd)},_filter,function (err,doc) {
        console.log(doc)
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }else{
            //保存cookie
            res.cookie('userId',doc._id)
            return res.json({code:0,data:doc})
        }
    })*/
})
//注册
Router.post('/register',function (req,res) {
    console.log(req.body) //获取参数
    const { name ,pwd, type} = req.body;
    mysql.query(`select * from user where account = '${name}'`,function (err,ret) {
        if (ret.length>0){
            return res.json({code:1,msg:'用户名已存在'})
        }
        mysql.query(`insert into user (account,password,types) values ('${name}','${pwd}','${type}')`,function (error,result) {
            if (error) {
                return res.json({code:1,msg:'后端出错了'})
            }else {
                mysql.query(`select * from user where account = '${name}'`,function (err,results) {
                    if (err){
                        return res.json({code:1,msg:'后端出错了'})
                    }
                    console.log(results[0])
                    let { names,type,uid } = results[0];
                    res.cookie('userId',uid);
                    return res.json({code:0,data:results[0]});
                })
            }
        })
    })
    // 先查询用户是否存在
    // User.findOne({name},function (err,doc) {
    //     if(doc){
    //         return res.json({code:1,msg:'用户名已存在'});
    //     }
    //     //没有就建立用户
    //     const userModel = new User({name ,type,pwd:md5Pwd(pwd)});
    //     userModel.save(function (err,doc) {
    //         if(err){
    //             return res.json({code:1,msg:'后端出错了'})
    //         }
    //
    //         let { name,type,_id } = doc;
    //         res.cookie('userId',_id);
    //         return res.json({code:0,data:doc});
    //
    //     })
    //     // User.create({name ,type,pwd:md5Pwd(pwd)},function (err,doc) {
    //     //     if(err){
    //     //         return res.json({code:1,msg:'后台出错了'})
    //     //     }else {
    //     //         return res.json({code:0})
    //     //     }
    //     // })
    // })
})

Router.get('/info',function (req,res) {
    //获取cookie
    const { userId } = req.cookies;
    if(!userId){
       return res.json({code:1})
    }
    mysql.query('select * from user where uid = '+userId,function (err,ret) {
        if(err){
            return res.json({code:1,msg:"后端出错"})
        }
        return res.json({code:0,data:ret[0]})
    })
    /*User.findOne({_id:userId},_filter,function (err,doc) {
        if(err){
            return res.json({code:1,msg:"后端出错"})
        }
        return res.json({code:0,data:doc})
    })*/
})
//获取用户聊天

Router.get('/getmsglist',function (req,res) {
    // Chat.remove({},(err,doc)=>{})
    const userId = req.cookies.userId;
    //先取出所有的用户名称和头像
    mysql.query(`select * from user`,function (err,ret) {
        if (!err){
            let users = {};
            ret.forEach(v=>{
                users[v.uid]={name:v.account,head:v.heads}
            })
            //获取消息
            mysql.query(`select * from chattab where froms=${userId} or tos=${userId}`,function (err,ret) {
                if (!err) {
                    return res.json({code:0,msgs:ret,users:users})
                }
            })
        }
    })
    /*User.find({},function (err,userdoc) {
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
    })*/

})

Router.post('/readmsg',function (req,res) {
    const userid = req.cookies.userId;
    const { from } = req.body;
    mysql.query('update chattab set '+'`'+'reads'+'`'+'='+1+' where froms='+from+' and tos='+userid+' and '+'`'+'reads'+'`'+'=0',function (err,ret) {
        if (!err){
            mysql.query(`select * from chattab where froms=${userid} or tos=${userid}`,function (error,result) {
                if (!error){
                    return res.json({code:0,num:ret.affectedRows,data:result})
                }
            })
        }
    })
})

Router.post('/news',function (req,res) {
    const step = req.body.step;
    mysql.query(`select * from news order by id limit ${step*10},${10*(step+1)}`,function (err,ret) {
        if (!err){
            return res.json({code:0,data:ret})
        }
    })
})

Router.post('/detail',function (req,res) {
    const id = req.body.id;
    mysql.query('select * from news where id = '+id,function (err,ret) {
        if (!err){
            res.json({code:0,data:ret[0]})
        }
    })
})


//加盐加密
function md5Pwd(pwd) {
    let salt = "yu_bo_yu_cai_LALA248957@#$%&*";
    return utility.md5(utility.md5(pwd+salt));
}

module.exports = Router;