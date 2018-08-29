const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
    description: String
})

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;