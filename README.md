# FootballMeet - 3D Football-Themed Video Conferencing App

![FootballMeet](https://img.shields.io/badge/FootballMeet-1.0.0-brightgreen)

A Google Meet-inspired video conferencing web application with an immersive 3D football theme. Built with React, Vite, Three.js, and WebRTC technologies.

## Features

- **3D Football Environment**: Immersive football field with animated elements
- **Real-time Video Conferencing**: Connect with multiple participants simultaneously
- **Football-themed UI**: Custom designed interface with football aesthetics
- **Video/Audio Controls**: Mute/unmute, video on/off, and screen sharing capabilities
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **React**: Frontend UI library
- **Vite**: Next-generation frontend tooling
- **Three.js**: 3D graphics library for creating the football environment
- **React Three Fiber**: React renderer for Three.js
- **Drei**: Useful helpers for React Three Fiber
- **Simple-Peer**: WebRTC for peer-to-peer connections
- **Socket.io**: Real-time bidirectional event-based communication
- **Styled Components**: CSS-in-JS styling solution
- **Framer Motion**: Animation library for React

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/footballmeet.git
   cd footballmeet
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter your name and a room ID on the join screen
2. Click "Join Game" to enter the video conference
3. Use the control panel at the bottom to manage your audio/video settings
4. Enjoy the 3D football environment while you chat!

## Project Structure

```
/src
  /components
    /FootballTheme     # 3D football elements
    /VideoCall         # Video conferencing components
    /UI                # User interface components
  /hooks               # Custom React hooks
  /services            # API and socket services
  App.jsx              # Main application component
  main.jsx             # Entry point
```

## License

MIT

## Acknowledgements

- Inspired by Google Meet
- Three.js for the amazing 3D capabilities
- All the open-source libraries that made this project possible
