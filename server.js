//express serverc
const express = require("express");
const app = express();
const listener = app.listen(process.env.PORT || 3000 , ()=>{
    console.log("app is listening at port:" + listener.address().port);
})

require("dotenv").config();

//connect to mdb
const mongoose = require('mongoose');
const db = mongoose.connect(process.env.MONGO_URI,(err)=>{
    if(err) console.error(err);
    console.log("connected to mongodb");
})


//fetch a file
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
})


//schema for our input and output data
const urlSchema = new mongoose.Schema({
    original_url:String,
    short_url:String
});

const ShortUrl=mongoose.model("ShortUrl",urlSchema);
module.exports = ShortUrl;


app.post('/api/shorturl',function(req,res,next){
    const submittedUrl = req.body.Url;
    const pattern = /^(http|https)(:\/\/)/;
    if(!pattern.test(submittedUrl)){
        console.error("Invalid URL");
        return res.json({error: 'invalid url'});
    }
});

//body-parser
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




