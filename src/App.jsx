import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import './App.css'

// Components
import VideoRoom from './components/VideoCall/VideoRoom'
import FootballField from './components/FootballTheme/FootballField'
import FootballBall from './components/FootballTheme/FootballBall'
import Header from './components/UI/Header'
import ControlPanel from './components/UI/ControlPanel'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #0a1929;
  color: white;
  overflow: hidden;
`

const MainContent = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`

const ThreeJSContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const VideoContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
  width: 100%;
`

function App() {
  const [isJoined, setIsJoined] = useState(false)
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')

  const handleJoinRoom = () => {
    if (roomId && userName) {
      setIsJoined(true)
    }
  }

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <ThreeJSContainer>
          <Canvas shadows>
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <FootballField />
            <FootballBall />
            <OrbitControls enableZoom={false} enablePan={false} />
            <PerspectiveCamera makeDefault position={[0, 5, 10]} />
          </Canvas>
        </ThreeJSContainer>

        {!isJoined ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className="join-form">
              <h2>Join Football Meet</h2>
              <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <button onClick={handleJoinRoom}>Join Game</button>
            </div>
          </motion.div>
        ) : (
          <VideoContainer>
            <VideoRoom roomId={roomId} userName={userName} />
          </VideoContainer>
        )}
      </MainContent>
      {isJoined && <ControlPanel />}
    </AppContainer>
  )
}

export default App
