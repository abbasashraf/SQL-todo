var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : 'firstmysql',
  database: 'newone'
});

connection.connect();
var idnew_table  = '2' ;
connection.query('select * from new_table where idnew_table = ' + id, function(err , result){
    console.log(result);
})