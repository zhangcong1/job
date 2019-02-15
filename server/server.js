//express并没有引入import的模块化，所以需要使用require()
const express = require('express');
const utility = require('utility');    //用于加密
const UserRoute = require('./UserRoute');   //引入用户路由
//引入中间件
const cookieParser = require('cookie-parser');   //存储cookie
const bodyParser = require('body-parser');     //解析post请求回来的数据

//新建app
const app = express();

//引入socket.io 配合express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection',function (socket) {
    //监听消息
    socket.on('sendmsg',function (data) {
        //讲消息发送出去
        io.emit('recvmsg',data)
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