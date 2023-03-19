var socket = io();

let btn = document.getElementById('btn');
let inputMsg = document.getElementById('newmsg');
let msgList = document.getElementById('msglist');

btn.onclick = function exec(){
    socket.emit('msgSend',{
        msg:inputMsg.value
    })
}

socket.on('msgRcvd',(data)=>{
    let liMsg = document.createElement('li');
    liMsg.innerText = data.msg;
    msgList.appendChild(liMsg);
})