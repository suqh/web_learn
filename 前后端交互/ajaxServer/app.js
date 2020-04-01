// 引入express框架
const express = require("express");
// 路径模块处理
const path = require("path");
const bodyParser = require("body-parser");
const formidable = require("formidable");

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
});

app.get("/searchAutoPrompt", (req, res) => {
    var arr = ['黑马', '黑马程序员', '黑马开发'];
    if (arr.includes(req.query.key)) {
        res.status(200).send(arr);
    } else {
        res.send([]);
    }
});

app.get("/province", (req, res) => {
    var arr = [{
        id: '001',
        name: '黑龙江省'
    }, {
        id: '002',
        name: '四川省'
    }, {
        id: '003',
        name: '河北省'
    }, {
        id: '004',
        name: '江苏省'
    }];
    res.send(arr);
});

app.get("/cities", (req, res) => {
    var arr = [];
    if (req.query.id == '001') {
        arr = [{
            id: '300',
            name: '哈尔滨市'
        }, {
            id: '301',
            name: '齐齐哈尔市'
        }, {
            id: '302',
            name: '牡丹江市'
        }, {
            id: '303',
            name: '佳木斯市'
        }]
    } else if (req.query.id == '002') {
        arr = [{
            id: '400',
            name: '成都市'
        }, {
            id: '401',
            name: '雅安市'
        }, {
            id: '402',
            name: '绵阳市'
        }]
    } else if (req.query.id == '003') {
        arr = [{
            id: '500',
            name: '廊坊市'
        }, {
            id: '501',
            name: '雄安市'
        }, {
            id: '502',
            name: '邯郸市'
        }]
    } else if (req.query.id == '004') {
        arr = [{
            id: '600',
            name: '苏州市'
        }, {
            id: '601',
            name: '南京市'
        }, {
            id: '602',
            name: '盐城市'
        }, {
            id: '603',
            name: '南通市'
        }]
    }
    res.send(arr);
});

app.get("/areas", (req, res) => {
    var arr = [];
    if (req.query.id == '500') {
        arr = [{
            id: '701',
            name: '安次区'
        }, {
            id: '701',
            name: '广阳区'
        }, {
            id: '702',
            name: '文安县'
        }, {
            id: '703',
            name: '大厂县'
        }]
    } else if (req.query.id == '501') {
        arr = [{
            id: '800',
            name: '容城'
        }, {
            id: '801',
            name: '安新'
        }]
    } else if (req.query.id == '502') {
        arr = [{
            id: '900',
            name: '临漳县'
        }, {
            id: '901',
            name: '成安县'
        }, {
            id: '902',
            name: '大名县'
        }]
    }
    res.send(arr);
});

app.post("/formData", (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        res.send(fields);
    })
});

// 实现文件上传的路由
app.post("/upload", (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname, "public", "uploads");
    // 保留上传文件的后缀名字
    form.keepExtensions = true;
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        // 将客户端传递过来的文件地址响应到客户端

        res.send({
            path: files.attrName.path.split("public")[1]
        });
    })
})

// 监听端口
app.listen(3000);
// 控制台提示输出
console.log("服务器启动成功");