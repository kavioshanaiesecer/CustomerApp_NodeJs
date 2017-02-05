//importing express js framework for NodeJs
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

//calling expressjs framework for app.js file
var app = express();

/*
//creating a middleware
var logger = function(req, res, next){
    console.log('Logging.......');
    next();
}
*/

/*
//calling the middleware
app.use(logger);
*/

//view Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname,'public')));

//Global Vars
app.use(function(req,res,next){
    res.locals.errors = null;
    next();
});

//Express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


var users = [
    { 
        id: 1,
        first_name : 'John',
        last_name : 'Doe',
        email: 'john@gmail.com',    
    },

     { 
        id: 2,
        first_name : 'Samatha',
        last_name : 'Diggle',
        email: 'Samatha@gmail.com',    
    },

     { 
        id: 3,
        first_name : 'Kaveendra',
        last_name : 'Oshan',
        email: 'flash@gmail.com',    
    },

]


/*
//creating json files to send json data
var people = [
    {
    name: 'Jeff',
    age: 30 
    },
     {
    name: 'Oliver',
    age: 25 
    },
     {
    name: 'Nathon',
    age: 70 
    }, {
    name: 'Harshani',
    age: 60 
    }
]
*/

/*
//creating routes to pass json
app.get('/',function(req, res){
    res.json(people);
});
*/

/*
//creating routes to pass file
app.get('/',function(req, res){
    res.send('Hello!!!');
});
*/

//creating route to pass ejs
app.get('/',function(req,res){

    res.render('index',{
         title:'Customers',
         users : users
    });
   
});

//catching the submission from the form
app.post('/users/add', function(req, res){

    req.checkBody('first_name','First Name is Required').notEmpty();
    req.checkBody('last_name','Last Name is Required').notEmpty();
    req.checkBody('email','Email is Required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.render('index',{
            title:'Customers',
            users : users,
            errors:errors
    });
    }
    else{
        var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
        console.log("SUCCESS");
    }
});


//creating the port for listening...
app.listen(3000, function(){
    console.log('Server Started on Port 3000');
});