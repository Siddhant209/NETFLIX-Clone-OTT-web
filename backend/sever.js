const express=require('express');
const server=express();
const dotenv =require('dotenv');
const mongoose =require('mongoose');
dotenv.config({path:'./config.env'})
const app =require('./app');

mongoose.connect(process.env.DB_CONNECTION,{
}).then(()=>{
    // console.log(con.connections)
    console.log("connection is successful")
})
const port = process.env.PORT || 8000;
app.listen(3000,()=>{
    console.log("port is running ");
})
