const greeting = name => `hell ${name}`;
const x = 100;
exports.x = x;
module.exports.greeting = greeting;
// 当exports对象和module.exports对象指向的不是同一个对象时 以module.exports为准
module.exports = {
    name: "zhangsna"
}
exports = {
    age: 20
}