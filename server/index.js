var express = require('express');
var app = express();
var bodyParser = require("body-parser")

var mariadb = require('mariadb/callback');
//let mysql = require('mysql');

var jwt = require('jsonwebtoken')

var cors = require('cors')
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.urlencoded({extended: true}));

const connection = mariadb.createConnection({
    host: 'localhost', 
    user:'root', 
    password: 'password123',
    database: 'ecom'
});

BigInt.prototype.toJSON = function() {       
    return this.toString()
}

// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'ecom'
// });

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the Maria server.');
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
                connection.query("INSERT INTO user(username, password) VALUES (?, ?)", [ req.body.username, req.body.password], (err, result)=>{
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
            
        let jwtSecretKey = "SOME_RANDOM_TEXT_JWT_SECRET_KEY";
        let data = {
            time: Date()
        }
  
        const token = jwt.sign(data, jwtSecretKey);
            res.json({msg: "verified", token: token, user: req.body.username});
        }
        else{
            res.json("unknown");
        }
    })
})

app.post("/addtocart", async (req, res)=>{
    console.log(req.body);
    connection.query("INSERT INTO cart(pUser, pID, pName, pPrice) VALUES (?, ?, ?, ?)", [req.body.user, req.body.pId, req.body.pName, req.body.pPrice], (err, result)=>{
        if(err) throw err;
        console.log(result)
        //res.send(result)
        res.send("Inserted");
    });
})

app.post("/getCount", async(req, res)=>{
    connection.query("SELECT COUNT(pID) as proCount FROM cart WHERE pUser = ?", [req.body.username], (err, result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.post("/getCart", async(req, res)=>{
    connection.query("SELECT * FROM cart WHERE pUser = ?", [req.body.username], (err, allProducts)=>{
        if(err) throw err;
        console.log(allProducts)
            res.send(allProducts);
    })
    
})

app.post("/deleteProduct", async (req, res)=>{
    connection.query("DELETE FROM cart WHERE pUser = ? and id = ?", [req.body.username, req.body.id], (err, allProducts)=>{
        if(err) throw err;
        console.log(allProducts)
            res.send(allProducts);
    })
})


app.listen(5000, (err)=>{
    if(err) throw err;
    console.log("Listening on port 5000")
})