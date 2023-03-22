const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:String
    },
    roomId:{
        type:String
    }
},{
    timeStamps:true
});

const Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat;