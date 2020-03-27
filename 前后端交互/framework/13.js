const express = require("express");
const path = require("path");
const app = express();

// 实现静态资源访问功能
// use 第一个参数  指定静态文件虚拟路径
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(3000);
console.log("网站服务器启动成功..");