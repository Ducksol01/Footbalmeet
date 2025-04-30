import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const FootballBall = () => {
  const ballRef = useRef();
  const [position] = useState(() => ({
    x: Math.random() * 10 - 5,
    y: Math.random() * 2 + 1,
    z: Math.random() * 10 - 5
  }));
  
  const [velocity] = useState(() => ({
    x: Math.random() * 0.05 - 0.025,
    y: Math.random() * 0.05,
    z: Math.random() * 0.05 - 0.025
  }));
  
  const [rotation] = useState(() => ({
    x: Math.random() * 0.02 - 0.01,
    y: Math.random() * 0.02 - 0.01,
    z: Math.random() * 0.02 - 0.01
  }));

  // Create football texture
  const createFootballTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    // Ball color
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Black pentagon pattern (simplified)
    context.fillStyle = 'black';
    
    // Draw hexagons
    for (let i = 0; i < 5; i++) {
      const centerX = canvas.width / 2 + Math.cos(i * Math.PI * 2 / 5) * 150;
      const centerY = canvas.height / 2 + Math.sin(i * Math.PI * 2 / 5) * 150;
      
      context.beginPath();
      for (let j = 0; j < 6; j++) {
        const angle = j * Math.PI * 2 / 6;
        const x = centerX + Math.cos(angle) * 50;
        const y = centerY + Math.sin(angle) * 50;
        
        if (j === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.closePath();
      context.fill();
    }
    
    // Center pentagon
    context.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = i * Math.PI * 2 / 5;
      const x = canvas.width / 2 + Math.cos(angle) * 60;
      const y = canvas.height / 2 + Math.sin(angle) * 60;
      
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.closePath();
    context.fill();
    
    return new THREE.CanvasTexture(canvas);
  };
  
  useFrame(() => {
    if (ballRef.current) {
      // Update position
      ballRef.current.position.x += velocity.x;
      ballRef.current.position.y += velocity.y;
      ballRef.current.position.z += velocity.z;
      
      // Apply gravity
      velocity.y -= 0.001;
      
      // Bounce off the ground
      if (ballRef.current.position.y < 0.5) {
        ballRef.current.position.y = 0.5;
        velocity.y = Math.abs(velocity.y) * 0.8;
      }
      
      // Bounce off the walls
      if (Math.abs(ballRef.current.position.x) > 14) {
        velocity.x = -velocity.x * 0.8;
      }
      
      if (Math.abs(ballRef.current.position.z) > 9) {
        velocity.z = -velocity.z * 0.8;
      }
      
      // Rotate the ball
      ballRef.current.rotation.x += rotation.x;
      ballRef.current.rotation.y += rotation.y;
      ballRef.current.rotation.z += rotation.z;
    }
  });
  
  return (
    <mesh 
      ref={ballRef} 
      position={[position.x, position.y, position.z]}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        map={createFootballTexture()}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
};

export default FootballBall;
