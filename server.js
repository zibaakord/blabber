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
  console.log('A user connected:', socket.id);

  const user = {
    id: socket.id,
    name: `User-${socket.id.slice(0, 5)}`,
    profilePic: null
  };

  users.add(socket.id);

  io.emit('userCount', users.size);

  socket.broadcast.emit('userConnected', user);

  socket.on('chatMessage', (message) => {
    console.log('Received message:', message);
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    users.delete(socket.id);

    io.emit('userCount', users.size);
    io.emit('userDisconnected', user.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
