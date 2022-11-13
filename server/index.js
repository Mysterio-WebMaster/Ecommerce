var express = require('express');
var app = express();
var bodyParser = require("body-parser")

var mariadb = require('mariadb/callback');
let mysql = require('mysql');

var cors = require('cors')
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.urlencoded({extended: true}));

// const conn = mariadb.createConnection({
//     host: 'localhost', 
//     user:'root', 
//     password: 'password123',
//     database: 'projectdata'
// });

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecom'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

//REGISTER
app.post("/register", (req, res)=>{
    if(req.body.username == "" || req.body.password == ""){
        res.send("empty");
    }
    else{
        connection.query("SELECT * FROM user WHERE username = ?", [req.body.username], (err, result, f)=> {
            if(err) throw err;
            if(result.length == 0){
                connection.query("INSERT INTO user VALUES (? ,?, ?)", ["", req.body.username, req.body.password], (err, result)=>{
                    if(err) throw err;
                    console.log(result)
                    res.send("Inserted");
                });
            }
            else{
                console.log(result)
                res.send("exist");
            }    
        })
    }

})

//LOGIN
app.post("/login", (req, res)=>{
    connection.query("SELECT * FROM user WHERE username = ? and password = ?", [req.body.username, req.body.password], (err, result, f)=> {
        if(result.length > 0){
            console.log("LoggedIn");
        }
        else{
            console.log("Does Not Exist");
        }
    })
})

app.listen(5000, (err)=>{
    if(err) throw err;
    console.log("Listening on port 5000")
})