'use client';

import React from 'react';
import { Tetromino } from '@/types/tetris';
import styles from '@/styles/GameInfo.module.scss';

interface GameInfoProps {
  score: number;
  lines: number;
  level: number;
  nextPiece: Tetromino | null;
  isGameOver: boolean;
  isPaused: boolean;
  onRestart: () => void;
  onPause: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({
  score,
  lines,
  level,
  nextPiece,
  isGameOver,
  isPaused,
  onRestart,
  onPause
}) => {
  return (
    <div className={styles.gameInfo}>
      <div className={styles.stats}>
        <h3>Game Statistics</h3>
        <div className={styles.stat}>
          <span className={styles.label}>Score:</span>
          <span className={styles.value}>{score.toLocaleString()}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Lines:</span>
          <span className={styles.value}>{lines}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Level:</span>
          <span className={styles.value}>{level}</span>
        </div>
      </div>

      {nextPiece && (
        <div className={styles.nextPiece}>
          <h3>Next Piece</h3>
          <div className={styles.nextPieceGrid}>
            {nextPiece.shape.map((row, y) => (
              <div key={y} className={styles.nextRow}>
                {row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`${styles.nextCell} ${cell ? styles.nextFilled : styles.nextEmpty}`}
                    style={{
                      backgroundColor: cell ? nextPiece.color : 'transparent'
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.controls}>
        <button 
          onClick={onPause}
          disabled={isGameOver}
          className={styles.controlButton}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button 
          onClick={onRestart}
          className={styles.controlButton}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameInfo;