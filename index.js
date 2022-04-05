const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
mongoose.connect(process.env.MONGO_URL,{
useNewUrlparser: true,
useUnifieldTopology: true,

})
.then(console.log("connected to MongoDB"))
.catch((err)=>console.log(err));


app.use("/" , (req,res)=>{
    console.log("hey this is main url");
})
app.listen("5000", ()=>{
    console.log("backend is running");
})