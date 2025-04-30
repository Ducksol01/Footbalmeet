import { io } from 'socket.io-client';

// Create a socket instance that connects to our server
const socket = io('http://localhost:5000', {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Socket events listeners
const socketEvents = {
  // Connect to the socket server
  connect: () => {
    if (!socket.connected) {
      socket.connect();
    }
  },

  // Disconnect from the socket server
  disconnect: () => {
    if (socket.connected) {
      socket.disconnect();
    }
  },

  // Join a room
  joinRoom: (roomId, userName) => {
    socket.emit('join-room', { roomId, userName });
  },

  // Listen for room users updates
  onRoomUsers: (callback) => {
    socket.on('room-users', (users) => {
      callback(users);
    });
  },

  // Toggle audio
  toggleAudio: (isMuted) => {
    socket.emit('toggle-audio', isMuted);
  },

  // Toggle video
  toggleVideo: (isVideoOn) => {
    socket.emit('toggle-video', isVideoOn);
  },

  // Remove all listeners when component unmounts
  cleanup: () => {
    socket.off('room-users');
  }
};

export default socketEvents;
