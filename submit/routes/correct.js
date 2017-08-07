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
    connectionLimit:10,
    host:'localhost',
    port:3306,
    user:'root',
    password:'456258',
    database:'LOG'
}
var pool = mysql.createPool(options);




    router.post('/',function (req,res) {
        //console.log(req.body);
         var password = req.body.password;
         var newpassword = req.body.newpassword;
         var ensure = req.body.ensure;
        pool.getConnection(function (error,connection) {
        var select = `select * from login where password  = '${password}'`;
        connection.query(select,function (error,results) {
            handError('查询', error);
            console.log(results);
            var pass = results[0].password;
            console.log(pass);
            if (pass == password) {
                console.log('111');
                var update = `update login set password = '${ensure}' where password = '${password}'`
                connection.query(update,function (error) {
                    handError('修改',error);
                })
             }
                // else {
            //     res.send('budui');
            // }



         })
        // console.log(req.body.password)
        // console.log(req.body.newpassword)
        // console.log(req.body.ensure)
        res.send('forget');
    })
})



module.exports = router;