const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

mongoose.connect('mongodb://isaac:abc123@ds263460.mlab.com:63460/my-app');
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());

require('./models/User');
require('./models/Product');
const users = require('./routes/users');
const products = require('./routes/products');
const locations = require('./routes/locations');
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/locations', locations);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port)

module.exports = app;