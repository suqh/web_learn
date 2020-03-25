// 1. 通过模块的名字fs对模块进行引用
const fs = require("fs");

// 2. 通过模块内部的readFile读取文件内容
fs.readFile("./01-helloworld.js", "utf-8", (err, doc) => {
    // 如果文件读取出错 err 是一个对象 包含错误信息
    // 如果文件读取正确 err 是 null
    // doc 是文件读取的结果
    console.log(err);
    console.log(doc);
})