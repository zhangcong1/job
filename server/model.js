const  mongoose = require('mongoose');
//连接mongo  地址在C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe   /demo相当于Mysql中的数据库的名字，没有回会自动建立
const DB_URL = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb/job';
mongoose.connect(DB_URL);
//提示信息
mongoose.connection.on('connected',function () {
    console.log("mongo connect success")
})

//建立模型
const model = {
    //用户模型
    User:{
        name:{type:String,require:true},
        pwd:{type:String,require:true},
        type:{type:String,require:true},
        //头像
        head:{type:String},
        //简介
        desc:{type:String},
        //如果是Boss还需要两条
        company:{type:String},
        money:{type:String}
    },
    //聊天模型
    Chat:{

    }
}

for(let m in model){
    mongoose.model(m,new mongoose.Schema(model[m]));
}

//出口
module.exports = {
    getModel:function (name) {
        return mongoose.model(name)
    }
}