const http = require('http'),
//axios = require('axios'),
logger = require('morgan'),
cors = require('cors'),//Allows to use any browser
express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),//Allows to connect to the DB
dotenv = require('dotenv'),
path = require('path'),
request = require('request');
var FinalProduct = require('./models/finalproduct');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('tiny'));


app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('views'));//Opening HTML-Online Bakery

app.get('/', async function(req, res) {
    console.log("HELLO FROM INDEX");
    const allproducts = await FinalProduct.find();
    res.render('index',{allproducts: allproducts});
    console.log("allproducts: " + allproducts);
});

//------------Server-----------

var port = process.env.PORT || 8000;
dotenv.config();



app.listen(port,function(err){
    console.log('Listening on port: ' + port);
});

const dbURI = process.env.DB_URL;
app.use(require('./routes'));

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('<<<<<<<<< ZARAY SAYS: CONECTED TO DB >>>>>>>'))
    .catch((err)=> console.log(err));