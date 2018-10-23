const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const User   = require('../../model/user'); // get our mongoose model
const app = require('../../server');

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://tbotelho:weaksauce123@ds033484.mlab.com:33484/token', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
  User.find({}, function(err, users) {
  res.json(users);
});
});

//*******All private routes go here****************************************
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/login', (req, res, next) => {
User.findOne({name: req.body.email})
  .exec()
  .then(user => {
    if(!user){
      return res.status(401).json({
        message: 'Auth Failed'
      });
    }
    console.log(req.body.password);
    console.log(user.password);
    if(req.body.password == user.password){
      // if user is found and password is right
      // create a token with only our given payload
      // we don't want to pass in the entire user since that has the password
      const payload = {
        admin: user.admin
      };

      var token = jwt.sign(payload, app.get('superSecret'), {
        expiresIn: '180m' // expires in 3hours
      });

      // return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    }
    else {
      res.status(401).json({
        message: 'Auth failed'
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

// // route middleware to verify a token
// apiRoutes.use(function(req, res, next) {
//
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   // decode token
//   if (token) {
//
//     // verifies secret and checks exp
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   } else {
//
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//       success: false,
//       message: 'No token provided.'
//     });
//
//   }
// });

router.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: user.admin
        };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: '180m' // expires in 3hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});


module.exports = router;
