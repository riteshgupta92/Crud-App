const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email Already Exists"]
    },
    age : {
        type : Number,
        required : true,
        min: [18, 'Age must be 18 or older']
    }
})

module.exports = mongoose.model("user", userSchema)