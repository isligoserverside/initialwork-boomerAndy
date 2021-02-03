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

//  Worksheet 3 01/2/2021
var data = {"foil" : { "name": "foil",
         "dob": "01/01/1998",
        "imageurl": "/images/foilimage1.jpg",
        "hobbies": ["Jokes", "Gags", "Stand up"]},

"arms" :  { "name": "arms",
        "dob": "03/05/1995",
       "imageurl": "/images/armsimage1.jpg"},

"hog" : { "name": "hog",
        "imageurl": "/images/hogimage1.jpg"} }




//  /Foil
app.get('/foil', (req,res) =>
       res.render('person', {person: data.foil} ))


//  /Arms
app.get('/arms', (req,res) =>
        res.render('person', {person: data.arms} ))

//  /hog
app.get('/hog', (req,res) =>
        res.render('person', {person: data.hog} ))
// use view engine and file home as default route.
app.get('/', function (req, res) {
    res.render('home');
});

// use view engine and display about
app.get('/about', function (req, res) {
    res.render('about');
});

// use view engine and display contact us
app.get('/contact', function (req, res) {
    res.render('contact');
});

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


//Worksheet 3



// /main page
app.get('/',  (req, res) => {
    res.type('text/plain');
    res.send('Covid Holiday Tours');
});

// /about
app.get('/about',  (req, res) => {
    res.type('text/plain');
    res.send('About Our Holidays');
});

// /contact
app.get('/contact',  (req, res) => {
    res.type('text/plain');
    res.send('Don\'t bother we never reply');
});

// my own page
app.get('/gay', (req,res) => {
    res.type('text/plain');
    res.send('Scaboosh, scabay, you now have the gay.');
});

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
