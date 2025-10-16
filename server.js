const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users = new Set();

io.on('connection', (socket) => {
  console.log('A user connected');

  users.add(socket.id);

  io.emit('userCount', users.size);

  socket.on('chatMessage', (message) => {
    console.log('Received message:', message);
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    users.delete(socket.id);
    io.emit('userCount', users.size);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
