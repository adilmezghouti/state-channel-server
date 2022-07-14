const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var cors = require('cors')

app.use(cors({
  origin: true,
  credentials: true
}))

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "https://thunder-network.github.io"],
    methods: ["GET", "POST"],
    credentials: true
  }
});



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  socket.on('transaction', (msg) => {
    console.log('transaction: ' + msg);
    socket.broadcast.emit('transaction', msg);
  });
});
server.listen(process.env.PORT, () => {
  console.log('listening on *:' + process.env.PORT);
});