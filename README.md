# Tetris Web

A modern Tetris game built with Next.js, TypeScript, and SCSS that can be played in web browsers.

## Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and SCSS
- **Keyboard Controls**: Use arrow keys to control the falling blocks
- **Classic Gameplay**: All 7 standard Tetris pieces (tetrominoes) with rotation and line clearing
- **Progressive Difficulty**: Game speed increases with level progression
- **Responsive Design**: Works on desktop and mobile browsers
- **Game States**: Pause/resume functionality and game over handling

## Controls

- **← / →** Arrow Keys: Move piece left/right
- **↓** Arrow Key: Move piece down faster
- **↑** Arrow Key: Rotate piece clockwise
- **Spacebar**: Pause/Resume game
- **Enter**: Restart game (when game over)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play the game.

## Game Rules

- Complete horizontal lines to clear them and score points
- The game ends when pieces reach the top of the board
- Score increases with level and number of lines cleared simultaneously
- Level increases every 10 lines cleared, making pieces fall faster

## Build

To build the game for production:

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **SCSS**: Enhanced CSS with variables and nesting
- **React Hooks**: Modern React state management

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── styles/          # SCSS stylesheets
├── types/           # TypeScript type definitions
└── utils/           # Game logic and utilities
```