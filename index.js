const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const user=require("./routes/api/user.js")

const dashboard=require("./routes/api/dashboard");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


app.use("/api/user",user)

app.use("/api/dashboard",dashboard)
app.listen(3000,()=>{
    console.log("Server run on port 3000")
})