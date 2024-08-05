const express = require("express");
const cors = require("cors");
const mysql = require("mysql");



const app = express();
app.use(cors());
app.use(express.json());



// //creating connection to database
const db=mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"crud"
})


// app.post('/signup', (req, res) =>{
//     // console.log(req.body.name);    
//     const sql="INSERT INTO users ('name','email','password') VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
//     db.query(sql,[values], (err,data) => {
//         if(err){
//             return res.json("error"+err);
//         }
//         return res.json(data);
//     })
// })

app.get("/",(req,res) => {
const sql="SELECT * From expense";
db.query(sql,(err,data)=>{
    if(err) return res.json("error");
    return res.json(data);
})
})

app.post('/expensemanagement',(req,res) => {
const sql="INSERT INTO addexpense ('date','amount','category','description') VALUES (?)";
const values = [
    req.body.date,
    req.body.amount,
    req.body.category,
    req.body.description,
]
db.query(sql, [values],(err,data)=>{
    if(err) reactRouterVersion.json("error");
    return res.json(data);
})


})

app.listen(8081, () => {

console.log('listening');

})


// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "crud"
})

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    con.query("INSERT INTO users (name,email,password) VALUES (?, ?, ?)", [name,email,password], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT ASKED DETAILS!"})
            }
        }
    )
})

app.post("/login", (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], 
        (err, result) => {
            if(err){
                req.setEncoding({err: err});
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "WRONG USERNAME OR PASSWORD!"})
                }
            }
        }
    )
})

// app.listen(3001, () => {
//     console.log("running backend server");
// })