const express = require('express');
const router = express.Router();
const testData = require('../lib/data.js');
router.get('/', (req, res) =>
res.render('personlist', { personlist: testData.getPeopleData() }));

router.get('/addnew', (req, res) => {
    let fname = req.query.firstname;
    let sname = req.query.surname;
    console.log('Date entered ' + fname + ' ' + sname);
    let data = {}

    res.render('personform', {firstname: fname, surname: sname})
}
)

router.post('/addnew', (req,res) => {
    let fname = req.body.firstname;
    let sname = req.body.surname;
    console.log('Data entered ' + fname + ' ' + sname);
    res.render('personform', {firstname: fname, surname: sname})
})


router.get('/:name',  (req, res) => {

    var name = req.params.name;
    var data = testData.getPeopleData();

    if (data[name] == null) {
        res.render('404'); // could also have a special page for person not found
    }
    else {
        res.render('person', { person: data[name] })
    }

})


//  Worksheet 3 and 4 03/02/2021
var data = {"foil" : { "name": "foil",
         "dob": "01/01/1998",
        "imageurl": "/images/foilimage1.jpg",
        "hobbies": ["Jokes", "Gags", "Stand up"]},

"arms" :  { "name": "arms",
        "dob": "03/05/1995",
       "imageurl": "/images/armsimage1.jpg"},

"hog" : { "name": "hog",
        "imageurl": "/images/hogimage1.jpg"} }

//export router
module.exports = router;



