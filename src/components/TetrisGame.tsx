'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GameState } from '@/types/tetris';
import { 
  createInitialGameState, 
  movePiece, 
  rotatePieceInGame,
  placePieceOnBoard 
} from '@/utils/gameLogic';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo';
import styles from '@/styles/TetrisGame.module.scss';

const TetrisGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);
  const [dropTime, setDropTime] = useState<number>(1000);

  const drop = useCallback(() => {
    if (!gameState.isPaused && !gameState.isGameOver) {
      setGameState(prev => movePiece(prev, 0, 1));
    }
  }, [gameState.isPaused, gameState.isGameOver]);

  const moveLeft = useCallback(() => {
    setGameState(prev => movePiece(prev, -1, 0));
  }, []);

  const moveRight = useCallback(() => {
    setGameState(prev => movePiece(prev, 1, 0));
  }, []);

  const moveDown = useCallback(() => {
    setGameState(prev => movePiece(prev, 0, 1));
  }, []);

  const rotate = useCallback(() => {
    setGameState(prev => rotatePieceInGame(prev));
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.isGameOver) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        moveLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveRight();
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        rotate();
        break;
      case ' ':
        event.preventDefault();
        togglePause();
        break;
      case 'Enter':
        if (gameState.isGameOver) {
          event.preventDefault();
          resetGame();
        }
        break;
    }
  }, [gameState.isGameOver, moveLeft, moveRight, moveDown, rotate, togglePause, resetGame]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const dropInterval = Math.max(100, 1000 - gameState.level * 100);
    setDropTime(dropInterval);
  }, [gameState.level]);

  useEffect(() => {
    if (!gameState.isPaused && !gameState.isGameOver) {
      const interval = setInterval(drop, dropTime);
      return () => clearInterval(interval);
    }
  }, [drop, dropTime, gameState.isPaused, gameState.isGameOver]);

  // Create display board with current piece
  const displayBoard = gameState.currentPiece 
    ? placePieceOnBoard(gameState.board, gameState.currentPiece)
    : gameState.board;

  return (
    <div className={styles.tetrisGame}>
      <div className={styles.gameContainer}>
        <GameBoard board={displayBoard} />
        <GameInfo 
          score={gameState.score}
          lines={gameState.lines}
          level={gameState.level}
          nextPiece={gameState.nextPiece}
          isGameOver={gameState.isGameOver}
          isPaused={gameState.isPaused}
          onRestart={resetGame}
          onPause={togglePause}
        />
      </div>
      
      <div className={styles.controls}>
        <h3>Controls:</h3>
        <ul>
          <li><strong>←/→</strong> Move left/right</li>
          <li><strong>↓</strong> Move down faster</li>
          <li><strong>↑</strong> Rotate piece</li>
          <li><strong>Space</strong> Pause/Resume</li>
          <li><strong>Enter</strong> Restart (when game over)</li>
        </ul>
      </div>

      {gameState.isGameOver && (
        <div className={styles.gameOverOverlay}>
          <div className={styles.gameOverMessage}>
            <h2>Game Over!</h2>
            <p>Final Score: {gameState.score}</p>
            <p>Lines Cleared: {gameState.lines}</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}

      {gameState.isPaused && !gameState.isGameOver && (
        <div className={styles.pauseOverlay}>
          <div className={styles.pauseMessage}>
            <h2>Game Paused</h2>
            <p>Press Space to resume</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TetrisGame;