'use client'

import React from 'react';
import { Tetromino } from '@/types/tetris';
import styles from './GameBoard.module.scss';

interface GameBoardProps {
  board: string[][];
  currentPiece: Tetromino | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, currentPiece }) => {
  // Create a display board that includes the current piece
  const getDisplayBoard = (): string[][] => {
    const displayBoard = board.map(row => [...row]);

    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;

            if (boardY >= 0 && boardY < displayBoard.length && 
                boardX >= 0 && boardX < displayBoard[0].length) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard;
  };

  const displayBoard = getDisplayBoard();

  return (
    <div className={styles.gameBoard}>
      <div className={styles.board}>
        {displayBoard.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${styles.cell} ${cell ? styles.filled : ''}`}
                style={{
                  backgroundColor: cell || 'transparent',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
