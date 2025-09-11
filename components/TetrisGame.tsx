"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  createInitialGameState,
  createTetromino,
  getRandomTetromino,
  isValidMove,
  placePieceOnBoard,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropSpeed,
  rotatePiece,
} from "@/utils/gameLogic";
import { GameState, Position } from "@/types/tetris";
import GameBoard from "./GameBoard";
import GameInfo from "./GameInfo";
import styles from "./TetrisGame.module.scss";

const TetrisGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(
    createInitialGameState()
  );
  const [lastDrop, setLastDrop] = useState(Date.now());

  // Initialize first piece
  useEffect(() => {
    if (!gameState.currentPiece && gameState.nextPiece) {
      const newPiece = createTetromino(gameState.nextPiece);
      const nextPiece = getRandomTetromino();

      setGameState((prev) => ({
        ...prev,
        currentPiece: newPiece,
        nextPiece: nextPiece,
      }));
    }
  }, [gameState.currentPiece, gameState.nextPiece]);

  const movePiece = useCallback((deltaX: number, deltaY: number) => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

      const newPosition: Position = {
        x: prev.currentPiece.position.x + deltaX,
        y: prev.currentPiece.position.y + deltaY,
      };

      if (isValidMove(prev.board, prev.currentPiece, newPosition)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: newPosition,
          },
        };
      }

      // If moving down and can't move, place the piece
      if (deltaY > 0) {
        return placePiece(prev);
      }

      return prev;
    });
  }, []);

  const rotatePieceClockwise = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

      const rotatedShape = rotatePiece(prev.currentPiece);

      if (
        isValidMove(
          prev.board,
          prev.currentPiece,
          prev.currentPiece.position,
          rotatedShape
        )
      ) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            shape: rotatedShape,
          },
        };
      }

      return prev;
    });
  }, []);

  const placePiece = (state: GameState): GameState => {
    if (!state.currentPiece) return state;

    const newBoard = placePieceOnBoard(state.board, state.currentPiece);
    const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

    const newLines = state.lines + linesCleared;
    const newLevel = calculateLevel(newLines);
    const newScore = state.score + calculateScore(linesCleared, state.level);

    const nextPiece = createTetromino(state.nextPiece!);
    const newNextPiece = getRandomTetromino();

    // Check game over
    const isGameOver = !isValidMove(
      clearedBoard,
      nextPiece,
      nextPiece.position
    );

    return {
      ...state,
      board: clearedBoard,
      currentPiece: isGameOver ? null : nextPiece,
      nextPiece: newNextPiece,
      score: newScore,
      level: newLevel,
      lines: newLines,
      isGameOver,
    };
  };

  const dropPiece = useCallback(() => {
    const now = Date.now();
    const dropSpeed = getDropSpeed(gameState.level);

    if (now - lastDrop > dropSpeed) {
      movePiece(0, 1);
      setLastDrop(now);
    }
  }, [gameState.level, lastDrop, movePiece]);

  const hardDrop = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

      let newY = prev.currentPiece.position.y;
      while (
        isValidMove(prev.board, prev.currentPiece, {
          x: prev.currentPiece.position.x,
          y: newY + 1,
        })
      ) {
        newY++;
      }

      const newPiece = {
        ...prev.currentPiece,
        position: { x: prev.currentPiece.position.x, y: newY },
      };

      return placePiece({
        ...prev,
        currentPiece: newPiece,
      });
    });
  }, []);

  const pauseGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const restartGame = useCallback(() => {
    setGameState(createInitialGameState());
    setLastDrop(Date.now());
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          movePiece(-1, 0);
          break;
        case "ArrowRight":
          event.preventDefault();
          movePiece(1, 0);
          break;
        case "ArrowDown":
          event.preventDefault();
          movePiece(0, 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          rotatePieceClockwise();
          break;
        case " ":
          event.preventDefault();
          hardDrop();
          break;
        case "p":
        case "P":
          event.preventDefault();
          pauseGame();
          break;
        case "r":
        case "R":
          if (gameState.isGameOver) {
            event.preventDefault();
            restartGame();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    gameState.isGameOver,
    movePiece,
    rotatePieceClockwise,
    hardDrop,
    pauseGame,
    restartGame,
  ]);

  // Game loop
  useEffect(() => {
    if (!gameState.isGameOver && !gameState.isPaused) {
      const gameLoop = setInterval(dropPiece, 16);
      return () => clearInterval(gameLoop);
    }
  }, [gameState.isGameOver, gameState.isPaused, dropPiece]);

  return (
    <div className={styles.tetrisGame}>
      <div className={styles.gameContainer}>
        <GameBoard
          board={gameState.board}
          currentPiece={gameState.currentPiece}
        />
        <GameInfo
          score={gameState.score}
          level={gameState.level}
          lines={gameState.lines}
          nextPiece={gameState.nextPiece}
          isGameOver={gameState.isGameOver}
          isPaused={gameState.isPaused}
          onRestart={restartGame}
          onPause={pauseGame}
        />
      </div>

      {gameState.isGameOver && (
        <div className={styles.gameOverOverlay}>
          <div className={styles.gameOverModal}>
            <h2>Game Over!</h2>
            <p>Final Score: {gameState.score}</p>
            <p>Level: {gameState.level}</p>
            <p>Lines: {gameState.lines}</p>
            <button onClick={restartGame}>Play Again (R)</button>
          </div>
        </div>
      )}

      <div className={styles.controls}>
        <h3>Controls:</h3>
        <p>← → Move left/right</p>
        <p>↓ Soft drop</p>
        <p>↑ Rotate</p>
        <p>Space Hard drop</p>
        <p>P Pause</p>
      </div>
    </div>
  );
};

export default TetrisGame;
