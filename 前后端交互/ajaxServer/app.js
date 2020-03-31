// 引入express框架
const express = require("express");
// 路径模块处理
const path = require("path");
const bodyParser = require("body-parser");

const fs = require("fs");
// 创建web服务器
const app = express();

// 接收urlencoded参数
// app.use(bodyParser.urlencoded());
// 接收json参数
app.use(bodyParser.json());


// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, "public")));


// 对应01html文件
app.get("/first", (req, res) => {
    // res.status(400).send("hello ajax");
    res.status(200).send("hello ajax");
});

// 对应02html文件
app.get("/responseData", (req, res) => {
    res.send({ "name": "zhangsan" });
});

// 对应03html文件
app.get("/get", (req, res) => {
    res.send(req.query);
});

// 对应04html文件
app.post("/post", (req, res) => {
    res.send(req.body);
});

// 对应05html文件
app.post("/json", (req, res) => {
    res.send(req.body);
});

// 对应06html文件
app.get("/readystate", (req, res) => {
    res.send("hello");
});

app.get("/error", (req, res) => {
    // console.log(abc);
    res.status(400).send("not ok");
});

app.get("/cache", (req, res) => {
    fs.readFile("./test.txt", (err, result) => {
        res.send(result);
    })
});

app.get("/verifyEmailAdress", (req, res) => {
    if (req.query.email == "suqh_wy@163.com") {
        res.status(400).send({ message: "邮箱地址已经注册过了，请更换其他邮箱地址" });
    } else {
        res.status(200).send({ message: "恭喜，邮箱地址可用" });
    }

})

// 监听端口
app.listen(3000);
// 控制台提示输出
console.log("服务器启动成功");