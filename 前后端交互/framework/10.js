// 引入express框架
const express = require("express");
const bodyParser = require("body-parser");

// 创建网站服务器
const app = express();
// 拦截所有请求，并对请求参数处理
// exteded: false 方法内部使用querystring模块处理请求参数的格式
// extended: true 方法内部使用第三方qs处理请求参数的格式
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/add", (req, res) => {
    res.send(req.body);
})

// 监听端口
app.listen(3000);
console.log("网站服务器启动成功");