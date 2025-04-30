import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import VideoParticipant from './VideoParticipant';

const VideoRoomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  width: 100%;
`;

const LocalVideoContainer = styled(motion.div)`
  width: 300px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: 2px solid #4caf50;
  position: relative;
`;

const ParticipantName = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
`;

const VideoRoom = ({ roomId, userName }) => {
  const [peers, setPeers] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const localVideoRef = useRef(null);
  useEffect(() => {
    // Connect to socket server
    socketEvents.connect();
    
    // Join the room
    socketEvents.joinRoom(roomId, userName);
    
    // Listen for room participants updates
    socketEvents.onRoomUsers((users) => {
      // Find our own ID in the participants list
      const localUser = users.find(user => user.userName === userName);
      if (localUser) {
        localParticipantId.current = localUser.id;
      }
      
      // Update participants list
      setParticipants(users);
    });
    
    // Cleanup on unmount
    return () => {
      socketEvents.cleanup();
      socketEvents.disconnect();
    };
  }, [roomId, userName]);

  // Get local media stream
  useEffect(() => {
    const getLocalMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
        // If we can't get video/audio, still allow joining with placeholders
        setIsVideoOn(false);
      }
    };

    getLocalMedia();

    // Cleanup function
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Toggle audio/video functions that also notify the server
  const toggleAudio = (muted) => {
    setIsMuted(muted);
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !muted;
      });
    }
    socketEvents.toggleAudio(muted);
  };

  const toggleVideo = (videoOn) => {
    setIsVideoOn(videoOn);
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = videoOn;
      });
    }
    socketEvents.toggleVideo(videoOn);
  };

  // Make these functions available to parent components (like ControlPanel)
  useEffect(() => {
    // Add these functions to window so ControlPanel can access them
    window.videoRoomControls = {
      toggleAudio,
      toggleVideo
    };
    
    return () => {
      delete window.videoRoomControls;
    };
  }, [localStream]);

  return (
    <VideoRoomContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Filter out the local participant from the list */}
      {participants.map(participant => (
        <VideoParticipant
          key={participant.id}
          stream={participant.id === localParticipantId.current ? localStream : null}
          name={participant.id === localParticipantId.current ? `${participant.userName} (You)` : participant.userName}
          isLocal={participant.id === localParticipantId.current}
          isMuted={participant.isMuted}
          isVideoOn={participant.isVideoOn}
        />
      ))}
    </VideoRoomContainer>
  );
};

export default VideoRoom;
