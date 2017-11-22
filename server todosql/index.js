var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var router = express.Router();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json(), function (err, req, res, next) {
    if (err) {
        return res.status(500).json({ error: err });
    }
    next();
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// router.get('/', function(req, res){
//    res.send('GET route on things.');
// });
// router.post('/', function(req, res){
//    res.send('POST route on things.');
// });

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'firstmysql',
    database: 'newone',
    multipleStatements: true
});
// connection.connect();
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

app.post('/add/', function (req, res) {
    console.log(req.body.name)
    todo = {
        name: req.body.name
    }
    connection.query('insert into new_table set ?', todo, function (err, result) {
        if (err) {
            console.log(err)
        }
        res.send(result);
        console.log(result);
    })

});

app.get('/get/', function (req, res) {
    connection.query('select * from new_table', function (err, result) {
        if (err) {
            console.log(err)
        }
        res.send(result);
        console.log(result);
    })

});
app.delete('/delete/:id', function (req, res) {
    console.log(req.params.id, "req.body.idnew_table")
    var id = req.params.id
    connection.query('DELETE FROM newone.new_table WHERE idnew_table= ?', [id], function (err, result) {
        if (err) {
            console.log(err)
        }
        res.send(result);
        console.log(result);
    })

});
app.put('/update/:id', function (req, res) {
    console.log('update run')
    console.log(req.params.id, "req.body.idnew_table")
    console.log(req.body.name, "todo")
    var value = req.body.name
    var id = req.params.id;

    connection.query(`update new_table set name= ? where idnew_table= ?`, [value, id], function (err, result) {
        if (err) {
            console.log(err)
        }
        res.send(result);
        console.log(result);
    })

});

app.listen(3000);