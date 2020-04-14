const express = require('express')
const app = express()
const bodyParser = require('body-parser')
    // 处理静态资源
app.use(express.static('public'))
    // 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置允许跨域访问该服务
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', ['mytoken', 'Content-Type']);
    next();
});

app.get('/async1', (req, res) => {
    // res.send('hello1');
    res.send('hello');
});

app.get('/async2', (req, res) => {
    if (req.query.info == 'hello') {
        res.send('world');
    } else {
        res.send('error');
    }
});

app.get('/adata', (req, res) => {
    res.send('Hello axios!')
});

app.get('/axios', (req, res) => {
    res.send('axios get 传递参数' + req.query.id)
});

app.get('/axios/:id', (req, res) => {
    res.send('axios get restful 传递参数' + req.params.id)
});


app.delete('/axios', (req, res) => {
    res.send('axios delete 传递参数' + req.query.id)
});

app.post('/axios', (req, res) => {
    res.send('axios post 传递参数' + req.body.uname + '---' + req.body.pwd);
});

app.put('/axios/:id', (req, res) => {
    res.send('axios put 传递参数' + req.params.id + '----' + req.body.uname + '---' + req.body.pwd);
});

app.get('/axios-json', (req, res) => {
    // 添加定时器 是为了验证 timeout 超时时间的
    setTimeout(function() {
        res.json({
            uname: 'lisi',
            age: 12
        })
    }, 2000);
});

app.get('/fdata', (req, res) => {
    res.send('Hello Fetch!')
});

app.get('/books', (req, res) => {
    res.send('传统的URL传递参数!' + req.query.id)
});

app.get('/books/:id', (req, res) => {
    res.send('Restful形式的URL传递参数!' + req.params.id)
});

app.delete('/books/:id', (req, res) => {
    res.send('DELETE请求传递参数!' + req.params.id)
});

app.post('/books', (req, res) => {
    res.send('POST请求传递参数!' + req.body.uname + '-----' + req.body.pwd);
});

app.put('/books/:id', (req, res) => {
    res.send('PUT请求传递参数!' + req.params.id + req.body.uname + '-----' + req.body.pwd);
});

app.get('/json', (req, res) => {
    res.json({
        uname: 'lisi',
        age: 13,
        gender: 'male'
    })
});

app.get('/a1', (req, res) => {
    setTimeout(function() {
        res.send('Hello TOM1!')
    }, 1000)
});


app.get('/a2', (req, res) => {
    setTimeout(function() {
        res.send('Hello TOM2!')
    }, 2000)
});

app.get('/a3', (req, res) => {
    setTimeout(function() {
        res.send('Hello TOM3!')
    }, 3000)
});


// 路由
app.get('/data', (req, res) => {
    res.send('Hello World!')
});
app.get('/data1', (req, res) => {
    res.send('Hello SUSAN!')
});
app.get('/data2', (req, res) => {
    setTimeout(function() {
        res.send('Hello TOM!')
    }, 1000)
});
app.get('/data3', (req, res) => {
    res.send('Hello JERRY!')
});

// 启动监听
app.listen(3000, () => {
    console.log('running...')
})