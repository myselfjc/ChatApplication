const express = require("express");
const { PORT } = require("./config/serverConfig");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const connect = require("./config/dbConfig");
const Chat = require('./models/chat');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

io.on("connection", (socket) => {
  socket.on("joinRoom", (data) => {
    socket.join(data.roomId);

    socket.on("msgSend", async (data) => {
        const chat = await Chat.create({
            content: data.msg,
            user: data.userName,
            roomId: data.roomId
        });
        console.log(chat);
      io.to(data.roomId).emit("msgRcvd", data);
    });
  });
});

app.use("/", express.static(__dirname + "/public/"));

app.get("/chat/:roomId", async (req, res) => {
    const chats = await Chat.find({
        roomId:req.params.roomId
    }).select('content user');
  res.render("index", {
    id: req.params.roomId,
    chats:chats
  });
});

server.listen(PORT, async () => {
  console.log(`App running on ${PORT}`);
  await connect();
  console.log("DB Connected!");
});
