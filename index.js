const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const user=require("./routes/api/user.js")
const index=require("./routes/api/index.js")
const bot=require("./routes/api/bot.js")

const dashboard=require("./routes/api/dashboard");

const Sequelize = require('sequelize');
const sequelize = new Sequelize('airbot', 'root', '', {
  host: 'localhost',
  dialect:"mysql"/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(express.static(__dirname+"/client/"))
app.use(function(req, res, next) {

     res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET , DELETE ");
    res.setHeader("Access-Control-Max-Age", "9633333");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 /*
  res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Authorization, Accept");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,authorization, Accept");


        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
   
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/
  next();
});

app.use("/api/user",user)
app.use("/api",index)
app.use("/api/bot",bot)

app.use("/api/dashboard",dashboard)
app.listen(5000,()=>{
    console.log("Server run on port 5000")
})
app.get("*",(req,res,err)=>{
  res.sendFile(__dirname+"/client/index.html")
})
module.exports={sequelize}