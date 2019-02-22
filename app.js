
// For creating our server
const express = require('express');
// dev keys
const keys = require('./config/keys');
// For the credit card
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
// express handlebars
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

    res.render('index',{
      stripePublishableKey: keys.stripePublishableKey
    });
    console.log('keep moving forward')

});


// Charge Route
app.post('/charge',(req,res) =>{
    // equals 25 dollars in stripe
    const amount = 5000;
    console.log(req.body);
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description:'eBook',
        currency:'usd',
        customer:customer.id
    }))
    .then(charge => res.render('success'));
});

// when deploying to heroku use process.env.port 

const port = process.env.PORT|| 5000;


app.listen(port,() =>{
    console.log(`Server started on ${port}`);
})