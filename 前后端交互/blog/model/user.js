// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require("mongoose");
// 导入bcrypt
const bcrypt = require("bcrypt");

// 引入joi模块
const joi = require("joi");

// 创建用户结合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        require: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});

// 创建集合
const User = mongoose.model("User", userSchema);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash("123456", salt);
    const user = await User.create({
        username: "妹子",
        email: "meizi@163.com",
        password: pass,
        role: "normal",
        state: 0
    });
}

// 初始化用户
// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = {
        username: joi.string().min(2).max(12).required().error(new Error("用户名不符合验证规则")),
        email: joi.string().email().required().error(new Error("邮箱格式不符合要求")),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error("密码格式不符合要求")),
        role: joi.string().valid("normal", "admin").required().error(new Error("角色值非法")),
        state: joi.number().valid(0, 1).required().error(new Error("状态值非法"))
    };

    // 实施验证
    return joi.validate(user, schema);
}

// 将用户集合作为模块成员导出
module.exports = {
    // User: User  在 es6中 键和值如果名称一样 可以简写
    User,
    validateUser
}