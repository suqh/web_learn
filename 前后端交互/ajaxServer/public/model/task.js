// 引入mongoose模块
const mongoose = require('mongoose');
// 创建任务集合规则
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });
// 创建todo集合
const Task = mongoose.model('task', taskSchema);


async function createTask() {
    const task = await Task.create({
        title: "打豆豆",
        completed: false
    });
}

// 初始化任务
// createTask();

// 将集合构造函数作为模块成员进行导出
module.exports = Task;