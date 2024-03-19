const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Guided_Flow_Database");
const nocache =  require("nocache")

const express = require("express");
const path = require("path")
const app = express();

app.use(nocache());
app.use(express.static('public'))
app.use('/images',express.static(path.join(__dirname,'/public/images')))

// For User Routes
const userRoute = require('./routes/userRoute')
app.use('/', userRoute);

// For Admin Routes
const adminRoute = require('./routes/adminRoute')
app.use('/admin', adminRoute);

app.listen(3030, function(){
    console.log("Server is running Port http://localhost:3030")
})
