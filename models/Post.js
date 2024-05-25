// Aqui ira el modelo de la publicación con los campos title, body y los timestamps.

const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email:{type:String, required: true},
    birthDay:{type:String, required: true},
    description: {type:String},
}, {timestamps : true});

const User = mongoose.model('User', userSchema);

module.exports = User;

