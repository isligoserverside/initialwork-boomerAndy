var peopleData = {"foil" : { "name": "foil",
         "dob": "01/01/1998",
        "imageurl": "/images/foilimage1.jpg",
        "hobbies": ["Jokes", "Gags", "Stand up"]},

"arms" :  { "name": "arms",
        "dob": "03/05/1995",
       "imageurl": "/images/armsimage1.jpg"},

"hog" : { "name": "hog",
        "imageurl": "/images/hogimage1.jpg"} }

        
exports.getPeopleData = () => {return peopleData}