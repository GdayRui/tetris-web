'use client';

import React from 'react';
import styles from '@/styles/GameBoard.module.scss';

interface GameBoardProps {
  board: number[][];
}

const PIECE_COLORS = [
  '', // 0 - empty
  '#00f0f0', // 1 - I piece (cyan)
  '#f0f000', // 2 - O piece (yellow)
  '#a000f0', // 3 - T piece (purple)
  '#00f000', // 4 - S piece (green)
  '#f00000', // 5 - Z piece (red)
  '#0000f0', // 6 - J piece (blue)
  '#f0a000', // 7 - L piece (orange)
];

const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  return (
    <div className={styles.gameBoard}>
      {board.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`${styles.cell} ${cell ? styles.filled : styles.empty}`}
              style={{
                backgroundColor: cell ? PIECE_COLORS[cell] || '#ffffff' : 'transparent'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;