const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const socketIo = require('socket.io');

app.use('/', express.static(path.join(__dirname, 'public')));


const serve = app.listen(port, () => console.log(`Example app listening on port %s`, port));

const io = socketIo(serve);

const messages = [];

io.on('connection', (socket) => {
  console.log("new connection");
  socket.emit('update_messages', messages);
  socket.on('new_message', (data) => {
    console.log(data)
    messages.push(data.msg);
    io.emit('update_messages', messages);
  });
})