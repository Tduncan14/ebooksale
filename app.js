
// For creating our server
const express = require('express');
// For the credit card
const stripe = require('stripe')('pk_test_4QvoBH1MnBRoWuvUaXifNjA1');
const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');

// intialize our application

const app = express();


//Handlebars MiddleWare
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//Body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// setting up a static folder, a place where we put our images and so forth
app.use(express.static(`${__dirname}/public`));


//Index Route creating a route

app.get('/',(req,res) =>{
    // render a template

    res.render('index');
    console.log('keep moving forward')

});

// when deploying to heroku use process.env.port 

const port = process.env.PORT|| 5000;


app.listen(port,() =>{
    console.log(`Server started on ${port}`);
})