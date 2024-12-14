const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const cors=require('cors');
const onnectToDb=require('./db/db');
onnectToDb();
app.use(cors());

app.get('/',(req,res)=>{
    res.send("server running");
});

module.exports=app;