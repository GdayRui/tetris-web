# Tetris Web Game

A modern, responsive Tetris game built with Next.js, TypeScript, and SCSS. Play the classic block-stacking puzzle game directly in your web browser with smooth animations and beautiful design.

## Features

- 🎮 **Classic Tetris Gameplay** - All 7 tetromino pieces (I, O, T, S, Z, J, L)
- ⌨️ **Keyboard Controls** - Arrow keys for movement and rotation
- 🎯 **Scoring System** - Points based on lines cleared and level
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful gradient backgrounds and glass-morphism effects
- 🔄 **Game Features** - Pause, restart, and next piece preview
- ⚡ **Performance** - Built with Next.js for optimal performance

## Controls

- **←/→ Arrow Keys**: Move piece left/right
- **↓ Arrow Key**: Soft drop (move piece down faster)
- **↑ Arrow Key**: Rotate piece clockwise
- **Spacebar**: Hard drop (instantly drop piece to bottom)
- **P**: Pause/Resume game
- **R**: Restart game (when game over)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd tetris-web
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to play!

### Build for Production

```bash
npm run build
npm start
```

## Game Rules

- **Objective**: Clear horizontal lines by filling them completely with blocks
- **Line Clearing**: When a horizontal line is completely filled, it disappears and all blocks above fall down
- **Scoring**:
  - 1 line = 40 × (level + 1) points
  - 2 lines = 100 × (level + 1) points
  - 3 lines = 300 × (level + 1) points
  - 4 lines (Tetris) = 1200 × (level + 1) points
- **Level**: Increases every 10 lines cleared, making pieces fall faster
- **Game Over**: When pieces reach the top of the playing field

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Enhanced CSS with modern features
- **React Hooks** - State management and game logic
- **CSS Grid & Flexbox** - Responsive layout system

## Project Structure

```
tetris-web/
├── app/                    # Next.js App Router
│   ├── globals.scss       # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── TetrisGame.tsx     # Main game component
│   ├── GameBoard.tsx      # Game board display
│   └── GameInfo.tsx       # Score and info panel
├── types/                 # TypeScript type definitions
│   └── tetris.ts         # Game-related types
├── utils/                 # Utility functions
│   └── gameLogic.ts      # Core game logic
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
