import { TetrominoType, TetrominoShape } from '@/types/tetris';

export const TETROMINOES: Record<TetrominoType, TetrominoShape> = {
  [TetrominoType.I]: {
    shape: [
      [1, 1, 1, 1]
    ],
    color: '#00f0f0'
  },
  [TetrominoType.O]: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#f0f000'
  },
  [TetrominoType.T]: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: '#a000f0'
  },
  [TetrominoType.S]: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: '#00f000'
  },
  [TetrominoType.Z]: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: '#f00000'
  },
  [TetrominoType.J]: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: '#0000f0'
  },
  [TetrominoType.L]: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: '#f0a000'
  }
};

export const getRandomTetromino = (): TetrominoType => {
  const types = Object.values(TetrominoType);
  return types[Math.floor(Math.random() * types.length)];
};

export const createTetromino = (type: TetrominoType, x: number = 3, y: number = 0) => {
  const tetromino = TETROMINOES[type];
  return {
    type,
    shape: tetromino.shape,
    color: tetromino.color,
    position: { x, y }
  };
};

export const rotatePiece = (shape: number[][]): number[][] => {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated: number[][] = [];
  
  for (let i = 0; i < cols; i++) {
    rotated[i] = [];
    for (let j = 0; j < rows; j++) {
      rotated[i][j] = shape[rows - 1 - j][i];
    }
  }
  
  return rotated;
};