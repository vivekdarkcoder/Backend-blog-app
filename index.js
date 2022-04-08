const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
// const DB = 'mongodb+srv://vivek_kumar:La8VWbv9au2YvEP@cluster0.5mxfu.mongodb.net/blogdata?retryWrites=true&w=majority';

// mongoose.connect(DB,{
//     useNewUrlParser: true,
   
// }).then(()=>{ 
//     console.log("connection done");
// }).catch((err)=> console.log(err));

dotenv.config({path:'./config.env'});
const DB = process.env.MONGO_URL;
app.use(express.json())
mongoose.connect(DB,{
    useNewUrlParser: true,
})
.then(console.log("connected to MongoDB"))
.catch((err)=>console.log(err));

app.use("/server/auth", authRoute)

app.listen("5000", ()=>{
    console.log("backend is running");
})