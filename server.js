const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors")

const app = express();

app.use(cors({
    origin: '*', // Replace with the origin of your frontend
  }));

app.use(express.json())

app.use("/api", require("./routes/user"))


const Port = process.env.PORT || 3000


app.listen(Port, ()=>{
    console.log(`Server is listening on Port ${Port}`)
})


const connectToMongoDb = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/userdb")
        console.log("Connect To MongoDB")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
connectToMongoDb()