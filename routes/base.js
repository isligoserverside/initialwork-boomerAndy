const express = require('express');
const router = express.Router();
//code to handle the '/' route
router.get('/',  (req, res) =>  {
    var message = "";
     
    if (req.cookies.tracking){
        var dateLastVisit = req.cookies.tracking;
        var message = "Welcome back, you last visited on :" + dateLastVisit;
    }

    var currentDate = new Date();
    res.cookie('tracking',currentDate.toUTCString());

    res.render('home', {'message': message});
});

// use view engine and display about
//  /about
router.get('/about', function (req, res) {
    res.render('about');
});

// use view engine and display contact us
//  /contact
router.get('/contact', function (req, res) {
    res.render('contact');
});

/* // Move staff/personlist to base.js
router.get('/personlist/:name', (req, res) => {
    var name = req.params.name;
    res.render('person', { person: data[name] })
})

router.get('/personlist', (req,res) =>
    res.render('personlist', { personlist: data }))
 */

//export router
module.exports = router;