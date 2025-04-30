const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store active rooms and their participants
const rooms = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // When a user joins a room
  socket.on('join-room', ({ roomId, userName }) => {
    // Join the socket.io room
    socket.join(roomId);
    
    // Create room if it doesn't exist
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    
    // Add user to the room
    const participant = { 
      id: socket.id, 
      userName, 
      isMuted: false,
      isVideoOn: true
    };
    rooms[roomId].push(participant);
    
    // Store roomId in socket for easy access on disconnect
    socket.roomId = roomId;
    socket.userName = userName;
    
    // Notify everyone in the room about the updated participant list
    io.to(roomId).emit('room-users', rooms[roomId]);
    
    console.log(`${userName} joined room ${roomId}`);
    console.log(`Room ${roomId} now has ${rooms[roomId].length} participants`);
  });
  
  // When a user toggles audio
  socket.on('toggle-audio', (isMuted) => {
    if (socket.roomId && rooms[socket.roomId]) {
      const participant = rooms[socket.roomId].find(p => p.id === socket.id);
      if (participant) {
        participant.isMuted = isMuted;
        io.to(socket.roomId).emit('room-users', rooms[socket.roomId]);
      }
    }
  });
  
  // When a user toggles video
  socket.on('toggle-video', (isVideoOn) => {
    if (socket.roomId && rooms[socket.roomId]) {
      const participant = rooms[socket.roomId].find(p => p.id === socket.id);
      if (participant) {
        participant.isVideoOn = isVideoOn;
        io.to(socket.roomId).emit('room-users', rooms[socket.roomId]);
      }
    }
  });
  
  // When a user disconnects
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    // Remove user from their room
    if (socket.roomId && rooms[socket.roomId]) {
      rooms[socket.roomId] = rooms[socket.roomId].filter(p => p.id !== socket.id);
      
      // Notify remaining participants
      io.to(socket.roomId).emit('room-users', rooms[socket.roomId]);
      
      // Clean up empty rooms
      if (rooms[socket.roomId].length === 0) {
        delete rooms[socket.roomId];
        console.log(`Room ${socket.roomId} deleted (empty)`);
      } else {
        console.log(`Room ${socket.roomId} now has ${rooms[socket.roomId].length} participants`);
      }
    }
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Signaling server running on port ${PORT}`);
});
