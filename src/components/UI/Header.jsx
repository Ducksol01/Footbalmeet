import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(10, 25, 41, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4caf50;
  display: flex;
  align-items: center;
  
  span {
    margin-left: 8px;
  }
`;

const FootballIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 0%, transparent 60%, #000 60%, #000 100%);
    mask: repeating-conic-gradient(#000 0deg 30deg, transparent 30deg 60deg);
    border-radius: 50%;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavItem = styled(motion.a)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #4caf50;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FootballIcon />
        <span>FootballMeet</span>
      </Logo>
      
      <NavItems>
        <NavItem 
          href="#"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          Home
        </NavItem>
        <NavItem 
          href="#"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          Features
        </NavItem>
        <NavItem 
          href="#"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          About
        </NavItem>
      </NavItems>
    </HeaderContainer>
  );
};

export default Header;
