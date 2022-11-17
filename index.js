const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");


dotenv.config({path:'./config.env'});
const DB = process.env.MONGO_URL;
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose.connect(DB,{
    useNewUrlParser: true,
})
.then(console.log("connected to MongoDB"))
.catch((err)=>console.log(err));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/server/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
app.use("/server/auth", authRoute)
app.use("/server/users", userRoute)
app.use("/server/posts", postRoute)
app.use("/server/categories", categoryRoute)

app.listen("5000", ()=>{
    console.log("backend is running");
})