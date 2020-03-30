// 引入mongoose第三方模块
const mongoose = require("mongoose");
// 导入config模块
const config = require("config");
console.log(config.get("db.host"));

// 连接数据路
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    // mongoose.connect("mongodb://suqh:suqh@localhost:27017/blog", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("数据库连接成功"))
    .catch(() => console.log("数据库连接失败"));