var mysql = require('mysql')
var handleError = require('./handleError')

//连接mysql需要参数
// var options = {
//     host:'localhost',
//     port:3306,
//     user:'root',
//     password:'',
//     database:'LOG'//连接时直接使用数据库 login
// }
//
// var connection = mysql.createConnection(options);
// connection.connect(function (error) {
//     handleError('连接',error)
// })
//
// var insertSQL = 'insert into user SET ? '
// var user = {
//     username : 'zhuliu',
//     password : 'abcd'
// }
// connection.query(insertSQL,user,function (error) {
//     handleError('插入',error)
// })

var options = {
    connectionLimit:3,
    host:'localhost',
    port:3306,
    user:'root',
    password:'456258',
    database:'NewB'
}
//连接池
//电池 游泳池
var pool = mysql.createPool(options)
pool.getConnection(function (error,connection) {
    // console.log(connection);
    var createDB = 'create database NewB'
    connection.query(createDB,function (error) {
        handleError('创建数据库',error);
    })
    var useDB = 'use NewB'
    connection.query(useDB,function (error) {
        handleError('使用数据库',error)
    })
    //自增字段 (auto_increment)
    var createTable = 'create table user (id int(20) auto_increment,username varchar(20),password varchar(20),' +
        'primary key(id))'
    connection.query(createTable,function (error) {
        handleError('创建表',error)
    })
    var insert = 'insert into user SET ?'
    var user = {
        username:'zhangsan',
        password:'123456'
    }
    connection.query(insert,user,function (error) {
        handleError('插入数据',error)
    })
})

pool.getConnection(function (error,connection) {
    var select = 'select * from user'
    connection.query(select,function (error) {
        handleError('查询',error)
        connection.release()
    })
})
pool.getConnection(function (error,connection) {
    var select = 'select * from user'
    connection.query(select,function (error) {
        handleError('查询',error)
        connection.release()
    })
})
pool.getConnection(function (error,connection) {
    var select = 'select * from user'
    connection.query(select,function (error) {
        handleError('查询',error)
    })
})
pool.getConnection(function (error,connection) {
    var select = 'select * from user'
    connection.query(select,function (error) {
        handleError('查询',error)
    })
})
pool.getConnection(function (error,connection) {
    var select = 'select * from user'
    connection.query(select,function (error) {
        handleError('查询',error)
    })
})



