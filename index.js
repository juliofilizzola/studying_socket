const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const socketIo = require('socket.io');

app.use('/grupo1', express.static(path.join(__dirname, 'public')));
app.use('/grupo2', express.static(path.join(__dirname, 'public')));


const serve = app.listen(port, () => console.log(`Example app listening on port %s`, port));

const io = socketIo(serve);

let messages = { grupo1: [], grupo2: [] };

const grupo1 = io.of("/grupo1").on('connection', (socket) => {
  console.log("new connection");
  socket.emit('update_messages', messages.grupo1);
  socket.on('new_message', (data) => {
  
    messages.grupo1.push(data);
    grupo1.emit('update_messages', messages.grupo1);
  });
})


const grupo2 = io.of("/grupo2").on('connection', (socket) => {
  console.log("new connection");
  socket.emit('update_messages', messages.grupo2);
  socket.on('new_message', (data) => {
    console.log(data)
    messages.grupo2.push(data);
    grupo2.emit('update_messages', messages.grupo2);
  });
})

// io.on('connection', (socket) => {
//   console.log("new connection");
//   socket.emit('update_messages', messages);
//   socket.on('new_message', (data) => {
//     console.log(data)
//     messages.push(data);
//     io.emit('update_messages', messages);
//   });
// })