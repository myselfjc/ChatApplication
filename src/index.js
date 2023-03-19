const express = require('express');
const { PORT } = require('./config/serverConfig');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app); 
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('msgSend',(data)=>{
        console.log(data);
        io.emit('msgRcvd',data)
    })
});

app.use('/',express.static(__dirname + '/public/'))

server.listen(PORT,()=>{
    
    console.log(`App running on ${PORT}`);
});
