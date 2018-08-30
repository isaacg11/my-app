const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
    request(`http://gd.geobytes.com/GetCityDetails`, (err, response, body) => {
        if(err) {
          res.sendStatus(500)        
        } else {
          res.json(body)       
        }
    })
})

module.exports = router;