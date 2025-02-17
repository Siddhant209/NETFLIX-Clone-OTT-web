const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    FullName:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
    active:{
        default:true,
        select:false,
        type:Boolean
    }
})
module.exports=User=mongoose.model("User",userSchema);