const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

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

const baseRouter = require('./routes/base');

app.use ('/', baseRouter);

const personlistRouter = require('./routes/personlist');

app.use('/personlist', personlistRouter)

// middleware for parsing the body of Posts need this before you can use req.body

app.use(express.urlencoded({ extended: true })) 


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
