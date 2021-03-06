//express并没有引入import的模块化，所以需要使用require()
const express = require('express');
const utility = require('utility');    //用于加密
const UserRoute = require('./UserRoute');   //引入用户路由
//引入中间件
const cookieParser = require('cookie-parser');   //存储cookie
const bodyParser = require('body-parser');     //解析post请求回来的数据

// const Model = require('./model')         //引入模型
// const Chat = Model.getModel('Chat')
const mysql = require('./mysql');
//新建app
const app = express();
//定时爬取数据
// const getData = require('./news');
// /*定时任务*/
// var CronJob = require('cron').CronJob;
// /*秒 分 时 天 月 星期 */
// new CronJob('* * * * * *', function() {
//     getData();
// }, null, true, 'America/Los_Angeles');

//引入socket.io 配合express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection',function (socket) {
    //监听消息
    socket.on('sendmsg',function (data) {
        const { from, to, msg } = data;
        const chatid = [from,to].sort().join('-');
        const currentdate = new Date().getTime();
        mysql.query(`insert into chattab (chatid,froms,tos,content,create_time) values ('${chatid}','${from}','${to}','${msg}',${currentdate})`,function (err,ret) {
            if (!err){
                /*console.log(`select * from chattab where froms='${to}' or tos='${to}'`)
                mysql.query(`select * from chattab where froms='${from}'`,function (error,result) {
                    if (!error){
                        io.emit('recvmsg',result)
                    }
                })*/
                let doc = {
                    cid: ret.insertId,
                    chatid: chatid,
                    froms: from,
                    tos: to,
                    reads:0,
                    content: msg,
                    create_time: currentdate
                }
                io.emit('recvmsg',Object.assign({},doc))
            }
        })
        /*const chatid = [data.from,data.to].sort().join('-');
        const {from,to,msg} = data;
        Chat.create({chatid,from,to,content:msg},function (err,doc) {
            if(!err){
                //讲消息发送出去
                io.emit('recvmsg',Object.assign({},doc._doc))
            }
        })*/

    })
})
//开启中间件
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',UserRoute);   //app.use()是开启一个中间件，如果这个中间件是一个路由，需要添加一个地址参数

//监听端口
server.listen(9094,function () {
    console.log('Node app start at port 9094');
})