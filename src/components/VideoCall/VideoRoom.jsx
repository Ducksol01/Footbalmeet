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
    // Create mock peers for demonstration purposes
    const mockPeers = [
      { id: 'user1', name: 'John' },
      { id: 'user2', name: 'Emma' },
      { id: 'user3', name: 'Michael' },
    ];
    
    setPeers(mockPeers);
    
    // Try to initialize camera if available
    const initCamera = async () => {
      try {
        // Check if mediaDevices is supported
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          });
          
          setLocalStream(stream);
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        } else {
          console.log('Media devices not supported in this browser');
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };
    
    initCamera();
      
    return () => {
      // Clean up
      if (localStream) {
        localStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [roomId]);
  
  return (
    <VideoRoomContainer>
      {/* Local video */}
      <LocalVideoContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <video 
          ref={localVideoRef} 
          autoPlay 
          playsInline 
          muted 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <ParticipantName>{userName} (You)</ParticipantName>
      </LocalVideoContainer>
      
      {/* Remote participants */}
      {peers.map((peer) => (
        <VideoParticipant 
          key={peer.id}
          peerName={peer.name}
        />
      ))}
    </VideoRoomContainer>
  );
};

export default VideoRoom;
