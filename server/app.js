const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const port = process.env.PORT || 5900;
const cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());

const todoRoute = require('./Routes/todoRoute');
const userRoute = require('./Routes/userRoute');
const {verifyToken} = require("./Heplers/Helpers");

mongoose.connect(process.env.DB_CONNECT).then(()=> console.log("connected to DB!")).catch(err => console.log(err))


app.use('/', todoRoute);
app.use('/', userRoute);


app.listen(port, ()=> console.log(`server running on ${port}`) );
