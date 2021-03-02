const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));
/* app.get('/', (req, res) => res.send('Hello World from Andrew, everything seems to be working'))
 */

 //Worksheet 2

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//  Worksheet 3 and 4 03/02/2021
/* var data = {"foil" : { "name": "foil",
         "dob": "01/01/1998",
        "imageurl": "/images/foilimage1.jpg",
        "hobbies": ["Jokes", "Gags", "Stand up"]},

"arms" :  { "name": "arms",
        "dob": "03/05/1995",
       "imageurl": "/images/armsimage1.jpg"},

"hog" : { "name": "hog",
        "imageurl": "/images/hogimage1.jpg"} } */

// Worksheet 7
const cookieParser = require('cookie-parser');
app.use(cookieParser("una is great"));

exports.home = (req, res) => {
    if (req.signedCookies.tracking) {
      var dateLastVisit = req.signedCookies.tracking;
      var message = "welcome back you last visited on :" + dateLastVisit;
    }
    else{
      message = ""
    }
    var currentDate = new Date();
    console.log (currentDate);
    res.cookie('tracking',currentDate.toUTCString(), {signed : true});
    res.render('home', {'message' : message})
  }
/* app.get('/',  (req, res) => {
    res.cookie ('tracking', true);
    res.render('home');
});
 */

// Code now in routes/base.js
/* app.get('/',  (req, res) => {

    var message = "";
     
    if (req.cookies.tracking){
        var dateLastVisit = req.cookies.tracking;
        var message = "Welcome back, you last visited on :" + dateLastVisit;
    }

    var currentDate = new Date();
    res.cookie('tracking',currentDate.toUTCString());

    res.render('home', {'message': message});
}); */


// consts from worksheet 8 pointing to base and route js

const baseRouter = require('./routes/base');

app.use ('/', baseRouter);

const personlistRouter = require('./routes/personlist');

app.use('/personlist', personlistRouter)


// Worksheet 5a
/* app.get('/personlist/:name', (req, res) => {
    var name = req.params.name;
    res.render('person', { person: data[name] })
})

app.get('/personlist', (req,res) =>
    res.render('personlist', { personlist: data }))
 */

/*  // use view engine and file home as default route.
    //all moved to route/base.js
app.get('/', function (req, res) {
    res.render('home');
}); */


/* // use view engine and display about
app.get('/about', function (req, res) {
    res.render('about');
});

// use view engine and display contact us
app.get('/contact', function (req, res) {
    res.render('contact');
}); */

// // 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// // 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


// Worksheet 3

// /main page
/* app.get('/',  (req, res) => {
    res.type('text/plain');
    res.send('Covid Holiday Tours');
}); */




// custom 404 page
app.use( (req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
