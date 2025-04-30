import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ParticipantContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* 4:3 aspect ratio */
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

const VideoElement = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ParticipantInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const ParticipantName = styled.div`
  font-weight: bold;
  font-size: 14px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

const StatusIndicators = styled.div`
  display: flex;
  gap: 8px;
`;

const MicIndicator = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.isMuted ? '#f44336' : '#4caf50'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '${props => props.isMuted ? '🔇' : '🔊'}';
    font-size: 12px;
  }
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
