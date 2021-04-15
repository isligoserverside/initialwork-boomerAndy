const express = require('express')
const app = express()
const port = 3000

// import routers

const baseRouter = require('./routes/base');
const personlistRouter = require('./routes/personlist');


// set up cookie for handling middleware

const cookieParser = require('cookie-parser');
app.use(cookieParser("una is great"));


// middleware for parsing body of forms before req.body

app.use(express.urlencoded({ extended: true })) 


// set up session handling middleware: note this uses cookies so that needs to be set
// up too.

const session = require('express-session');


app.use(session(
    {secret: "una is great!!", 
    cookie: { maxage: 6000},
    resave: false,
    saveUninitialized: false
  }))



// set up handlebars view engine

var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// static files get served from the public folder

app.use(express.static('public'));


//import own middleware

const {flashMiddleware, newsMiddleware} = require('./lib/middleware.js');
app.use(flashMiddleware);
app.use(newsMiddleware);


// set up own routes

app.use ('/', baseRouter);

app.use('/personlist', personlistRouter)


// custom 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// custom 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


/* // custom 404 page
app.use( (req, res) => {
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
}); */


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
