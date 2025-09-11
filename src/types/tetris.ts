export interface Position {
  x: number;
  y: number;
}

export interface TetrominoShape {
  shape: number[][];
  color: string;
}

export enum TetrominoType {
  I = 'I',
  O = 'O',
  T = 'T',
  S = 'S',
  Z = 'Z',
  J = 'J',
  L = 'L'
}

export interface Tetromino {
  type: TetrominoType;
  shape: number[][];
  color: string;
  position: Position;
}

export interface GameState {
  board: number[][];
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  score: number;
  lines: number;
  level: number;
  isGameOver: boolean;
  isPaused: boolean;
}

export interface GameConfig {
  boardWidth: number;
  boardHeight: number;
  dropInterval: number;
}