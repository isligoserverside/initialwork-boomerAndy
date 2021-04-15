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
/* router.get('/about', function (req, res) {
    res.render('about');
}); */

router.get('/about', (req, res) => {
    res.render('about', {
        tags: "about, background", linkdata:
            [
                { url: "itsligo.ie", text: '<strong> IT Sligo Web</strong>' },
                { url: "www.irishtimes.ie", text: 'The Irish Times' }
            ]
    })
});


// use view engine and display contact us
//  /contact
router.get('/contact', function (req, res) {
    res.render('contact');
});



//export router
module.exports = router;