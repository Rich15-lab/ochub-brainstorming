const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Send index.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle socket connection
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for chat messages from the client
    socket.on('chatMessage', (msg) => {
        console.log(`Message from ${socket.id}: ${msg}`);
        // Broadcast the message to all connected clients
        io.emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

