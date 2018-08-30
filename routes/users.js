const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');

router.post('/signup', ((req, res, next) => {
  let newUser = new User();
  newUser.username = req.body.username;
  newUser.setPassword(req.body.password);
  newUser.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.json({token: newUser.generateJWT()})
    }
  })
}));

router.post('/login', ((req, res) => {
  User.findOne({username: req.body.username}, ((err, user) => {
    if(err) {
      res.sendStatus(500)
    } else {
      if(user.validatePassword(req.body.password)) {
        res.json({token: user.generateJWT()})
      } else {
        res.json('Incorrect Password')
      }
    }
  }))
}))

module.exports = router;