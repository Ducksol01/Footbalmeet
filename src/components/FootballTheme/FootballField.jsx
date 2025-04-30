import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FootballField = () => {
  const fieldRef = useRef();
  
  // Create field lines texture
  const createFieldTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext('2d');
    
    // Field color
    context.fillStyle = '#4caf50';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Field lines
    context.strokeStyle = 'white';
    context.lineWidth = 5;
    
    // Outline
    context.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    // Center circle
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 150, 0, Math.PI * 2);
    context.stroke();
    
    // Center line
    context.beginPath();
    context.moveTo(canvas.width / 2, 50);
    context.lineTo(canvas.width / 2, canvas.height - 50);
    context.stroke();
    
    // Goal areas
    context.strokeRect(50, canvas.height / 2 - 200, 100, 400);
    context.strokeRect(canvas.width - 150, canvas.height / 2 - 200, 100, 400);
    
    // Penalty areas
    context.strokeRect(50, canvas.height / 2 - 300, 200, 600);
    context.strokeRect(canvas.width - 250, canvas.height / 2 - 300, 200, 600);
    
    // Penalty spots
    context.beginPath();
    context.arc(200, canvas.height / 2, 10, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    
    context.beginPath();
    context.arc(canvas.width - 200, canvas.height / 2, 10, 0, Math.PI * 2);
    context.fill();
    
    // Corner arcs
    context.beginPath();
    context.arc(50, 50, 30, 0, Math.PI / 2);
    context.stroke();
    
    context.beginPath();
    context.arc(canvas.width - 50, 50, 30, Math.PI / 2, Math.PI);
    context.stroke();
    
    context.beginPath();
    context.arc(50, canvas.height - 50, 30, Math.PI * 3 / 2, Math.PI * 2);
    context.stroke();
    
    context.beginPath();
    context.arc(canvas.width - 50, canvas.height - 50, 30, Math.PI, Math.PI * 3 / 2);
    context.stroke();
    
    return new THREE.CanvasTexture(canvas);
  };
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (fieldRef.current) {
      // Add subtle movement to the field
      fieldRef.current.position.y = Math.sin(time * 0.2) * 0.05 - 0.5;
    }
  });
  
  return (
    <group>
      {/* Football field */}
      <mesh 
        ref={fieldRef} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.5, 0]} 
        receiveShadow
      >
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial 
          map={createFieldTexture()} 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Reflective floor beneath the field */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.51, 0]}
      >
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
      
      {/* Goal posts */}
      <GoalPost position={[-13, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <GoalPost position={[13, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
};

// Goal post component
const GoalPost = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Left post */}
      <mesh position={[0, 1, -2.5]} castShadow>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Right post */}
      <mesh position={[0, 1, 2.5]} castShadow>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Crossbar */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[0.1, 0.1, 5]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Net (simplified) */}
      <mesh position={[-0.5, 1, 0]}>
        <boxGeometry args={[1, 2, 5]} />
        <meshStandardMaterial 
          color="white" 
          transparent={true} 
          opacity={0.2} 
          wireframe={true} 
        />
      </mesh>
    </group>
  );
};

export default FootballField;
