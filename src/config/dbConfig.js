const mongoose = require('mongoose');

const connect = async () =>{
    mongoose.connect('mongodb://localhost/chatApp');
};

module.exports = connect;