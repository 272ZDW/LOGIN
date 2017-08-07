var express = require('express')
var router = express.Router();
var mysql = require('mysql');

function handError(message, error) {
    if (error) {
        console.log(message + '失败');
        console.log(error);
        return false
    } else {
        console.log(message + '成功');
        return true
    }
}

var options = {
    connectionLimit:3,
    host:'localhost',
    port:3306,
    user:'root',
    password:'456258',
    database:'LOG'
}
var pool = mysql.createPool(options)

pool.getConnection(function (error,connection) {
    router.post('/',function (req,res) {
        console.dir(req)
        console.log(req.body.username);
        console.log(req.body.password);
        var select = 'select *from login';
        connection.query(select,function (error,results) {
            handError('查询', error);
            var username = req.body.username;
            var password = req.body.password;
            console.log(results)
            for (var i = 0; i < results.length; i++) {
                if (username == results[i]['username']) {
                    if (password == results[i]['password']) {
                        res.render('loginsuccess', {'title': '登录成功'});
                    } else {
                        res.render('loginsuccess', {'title': '密码错误'});
                    }
                } else {
                    if (i == results.length - 1) {
                        res.render('loginsuccess', {'title': '用户名不存在'});
                    }
                }
            }
        })
    })

})
// router.get('/',function (req,res) {
//     console.dir(req.query)
//     res.send('登录成功')
// })


module.exports = router;