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
    host:'localhost',
    port:'3306',
    user:'root',
    password:'456258',
    database:'LOG'
}
var connection = mysql.createConnection(options);
connection.connect(function (error) {
    if(error){
        console.log('连接失败')
    }else{
        console.log('连接成功')
    }
})

// var user = 'use LOG'
// connection.query(user,function (error) {
//     if(error){
//         console.log('使用失败')
//     }else{
//         console.log('使用成功')
//     }
// })



router.get('/',function (req,res) {
    console.dir(req.query)
    // console.log(req.query.username);
    // console.log(req.query.password);
    res.send('登录成功')
})


router.post('/',function (req,res) {
    console.dir(req)
    console.log(req.body.username);
    console.log(req.body.password);

    // var select = "select * from user where username = " + "'" + req.body.username + "'"
    // + "and password =" + "'" + req.body.password + "'"
    //模板字符串 (ES6新语法)
    // var selectuser = `select * from user where username = '${req.body.username}' and password
    // = '${req.body.password}'`
    // var selectusername = `select * from user where username = '${req.body.username}'`
    var select = 'select *from login';
    connection.query(select,function (error,results) {
        handError('查询', error);
        var username = req.body.username;
        var password = req.body.password;
        console.log(results)
        console.log(username)
        console.log(password)
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

    // res.send('登录成功');
})

module.exports = router;