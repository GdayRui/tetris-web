'use client'

import React from 'react';
import { TetrominoShape } from '@/types/tetris';
import styles from './GameInfo.module.scss';

interface GameInfoProps {
  score: number;
  level: number;
  lines: number;
  nextPiece: TetrominoShape | null;
  isGameOver: boolean;
  isPaused: boolean;
  onRestart: () => void;
  onPause: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({
  score,
  level,
  lines,
  nextPiece,
  isGameOver,
  isPaused,
  onRestart,
  onPause,
}) => {
  const renderNextPiece = () => {
    if (!nextPiece) return null;

    return (
      <div className={styles.nextPieceContainer}>
        <h3>Next</h3>
        <div className={styles.nextPieceGrid}>
          {nextPiece.shape.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.nextPieceRow}>
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${styles.nextPieceCell} ${cell ? styles.filled : ''}`}
                  style={{
                    backgroundColor: cell ? nextPiece.color : 'transparent',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.gameInfo}>
      <div className={styles.statsContainer}>
        <h2>Tetris</h2>
        
        <div className={styles.stat}>
          <span className={styles.label}>Score</span>
          <span className={styles.value}>{score.toLocaleString()}</span>
        </div>
        
        <div className={styles.stat}>
          <span className={styles.label}>Level</span>
          <span className={styles.value}>{level}</span>
        </div>
        
        <div className={styles.stat}>
          <span className={styles.label}>Lines</span>
          <span className={styles.value}>{lines}</span>
        </div>
      </div>

      {renderNextPiece()}

      <div className={styles.buttonContainer}>
        <button
          className={styles.gameButton}
          onClick={onPause}
          disabled={isGameOver}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        
        <button
          className={styles.gameButton}
          onClick={onRestart}
        >
          Restart
        </button>
      </div>

      {isPaused && !isGameOver && (
        <div className={styles.pausedIndicator}>
          <h3>PAUSED</h3>
          <p>Press P to resume</p>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
