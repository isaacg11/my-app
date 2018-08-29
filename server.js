const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

mongoose.connect('mongodb://isaac:abc123@ds263460.mlab.com:63460/my-app');
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());

require('./models/Todo');
const Todo = mongoose.model('Todo');

app.post('/api/todos', (req, res) => {
    let newTodo = new Todo();
    newTodo.description = req.body.description;
    newTodo.save((err) => {
        if(err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

app.get('/api/todos', (req, res) => {
    Todo.find({}).then((todos) => {
        res.json(todos)
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port)

module.exports = app;