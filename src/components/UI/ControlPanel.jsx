import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ControlPanelContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  padding: 15px 25px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ControlButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? '#2196f3' : '#333'};
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? '#1976d2' : '#444'};
  }
  
  &.danger {
    background-color: #f44336;
    
    &:hover {
      background-color: #d32f2f;
    }
  }
`;

const ControlPanel = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  // Check if videoRoomControls is available from VideoRoom component
  useEffect(() => {
    // This ensures we have access to the controls exposed by VideoRoom
    if (!window.videoRoomControls) {
      console.warn('VideoRoom controls not available yet');
    }
  }, []);
  
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Use the controls exposed by VideoRoom if available
    if (window.videoRoomControls && window.videoRoomControls.toggleAudio) {
      window.videoRoomControls.toggleAudio(newMutedState);
    } else {
      console.warn('Cannot toggle audio: controls not available');
    }
  };
  
  const toggleVideo = () => {
    const newVideoState = !isVideoOn;
    setIsVideoOn(newVideoState);
    
    // Use the controls exposed by VideoRoom if available
    if (window.videoRoomControls && window.videoRoomControls.toggleVideo) {
      window.videoRoomControls.toggleVideo(newVideoState);
    } else {
      console.warn('Cannot toggle video: controls not available');
    }
  };
  
  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // Screen sharing would require additional implementation
    // For now, we'll just show a placeholder
    alert('Screen sharing feature coming soon!');
  };
  
  const leaveCall = () => {
    // Disconnect from socket before leaving
    if (window.videoRoomControls && window.videoRoomControls.disconnect) {
      window.videoRoomControls.disconnect();
    }
    
    // Navigate back to home page
    window.location.href = '/';
  };

  return (
    <ControlPanelContainer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <ControlButton 
        onClick={toggleMute}
        active={!isMuted}
        whileTap={{ scale: 0.9 }}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? '🔇' : '🔊'}
      </ControlButton>
      
      <ControlButton 
        onClick={toggleVideo}
        active={isVideoOn}
        whileTap={{ scale: 0.9 }}
        title={isVideoOn ? "Turn off camera" : "Turn on camera"}
      >
        {isVideoOn ? '📹' : '🚫'}
      </ControlButton>
      
      <ControlButton 
        onClick={toggleScreenShare}
        active={isScreenSharing}
        whileTap={{ scale: 0.9 }}
        title={isScreenSharing ? "Stop sharing screen" : "Share screen"}
      >
        {isScreenSharing ? '📺' : '💻'}
      </ControlButton>
      
      <ControlButton 
        className="danger"
        onClick={leaveCall}
        whileTap={{ scale: 0.9 }}
        title="Leave call"
      >
        📞
      </ControlButton>
    </ControlPanelContainer>
  );
};

export default ControlPanel;
