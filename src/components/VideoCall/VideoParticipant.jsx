import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ParticipantContainer = styled(motion.div)`
  width: 300px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: 2px solid #2196f3;
  position: relative;
`;

const ParticipantVideo = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1a3a5f;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const ParticipantAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #2196f3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
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

const ParticipantAudioIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.isActive ? '#4caf50' : 'transparent'};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
    color: white;
  }
`;

// Animated background for participants
const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #1a3a5f, #2196f3);
    opacity: 0.7;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 10%),
                     radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.1) 0%, transparent 20%);
    animation: pulse 4s infinite alternate;
  }
`;

const VideoParticipant = ({ peerName }) => {
  const [isAudioActive, setIsAudioActive] = useState(
    Math.random() > 0.5 // Randomly set audio active status for demo
  );
  
  useEffect(() => {    
    // Simulate audio activity changes
    const audioActivityInterval = setInterval(() => {
      setIsAudioActive(Math.random() > 0.7);
    }, 2000);
    
    return () => {
      clearInterval(audioActivityInterval);
    };
  }, []);
  
  // Get first letter of name for avatar
  const getInitial = (name) => {
    return name.charAt(0);
  };
  
  return (
    <ParticipantContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ParticipantVideo>
        <AnimatedBackground />
        <ParticipantAvatar>
          {getInitial(peerName)}
        </ParticipantAvatar>
      </ParticipantVideo>
      <ParticipantName>{peerName}</ParticipantName>
      <ParticipantAudioIndicator isActive={isAudioActive}>
        {isAudioActive && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
          </svg>
        )}
      </ParticipantAudioIndicator>
    </ParticipantContainer>
  );
};

export default VideoParticipant;
