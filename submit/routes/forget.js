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

// var options = {
//     connectionLimit:3,
//     host:'localhost',
//     port:3306,
//     user:'root',
//     password:'456258',
//     database:'LOG'
// }
// var pool = mysql.createPool('options')
// pool.getConnection(function (error,connection) {
//
//
// })

router.get('/',function (req,res) {

    res.render('forget')
})

module.exports = router;