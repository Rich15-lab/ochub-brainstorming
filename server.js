const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Create the Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for chat messages from clients
  socket.on('chat message', (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    io.emit('chat message', msg); // Broadcast to all clients
  });

  // Handle user disconnections
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

