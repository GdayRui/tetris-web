import { Tetromino, GameState, Position, TetrominoType } from '@/types/tetris';
import { createTetromino, getRandomTetromino, rotatePiece } from './tetrominoes';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const createEmptyBoard = (): number[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
};

export const isValidPosition = (
  board: number[][],
  piece: Tetromino,
  newPosition: Position
): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const newX = newPosition.x + x;
        const newY = newPosition.y + y;

        // Check boundaries
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }

        // Check collision with existing pieces (but not above the board)
        if (newY >= 0 && board[newY][newX] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placePieceOnBoard = (board: number[][], piece: Tetromino): number[][] => {
  const newBoard = board.map(row => [...row]);

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;

        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          // Use piece type number for color coding
          const pieceTypeNum = Object.values(TetrominoType).indexOf(piece.type) + 1;
          newBoard[boardY][boardX] = pieceTypeNum;
        }
      }
    }
  }

  return newBoard;
};

export const clearLines = (board: number[][]): { newBoard: number[][], linesCleared: number } => {
  const newBoard = board.filter(row => row.some(cell => cell === 0));
  const linesCleared = BOARD_HEIGHT - newBoard.length;

  // Add empty rows at the top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0));
  }

  return { newBoard, linesCleared };
};

export const movePiece = (
  gameState: GameState,
  deltaX: number,
  deltaY: number
): GameState => {
  if (!gameState.currentPiece || gameState.isGameOver || gameState.isPaused) {
    return gameState;
  }

  const newPosition = {
    x: gameState.currentPiece.position.x + deltaX,
    y: gameState.currentPiece.position.y + deltaY
  };

  if (isValidPosition(gameState.board, gameState.currentPiece, newPosition)) {
    return {
      ...gameState,
      currentPiece: {
        ...gameState.currentPiece,
        position: newPosition
      }
    };
  }

  // If moving down and can't move, lock the piece
  if (deltaY > 0) {
    return lockPiece(gameState);
  }

  return gameState;
};

export const rotatePieceInGame = (gameState: GameState): GameState => {
  if (!gameState.currentPiece || gameState.isGameOver || gameState.isPaused) {
    return gameState;
  }

  const rotatedShape = rotatePiece(gameState.currentPiece.shape);
  const rotatedPiece = {
    ...gameState.currentPiece,
    shape: rotatedShape
  };

  if (isValidPosition(gameState.board, rotatedPiece, gameState.currentPiece.position)) {
    return {
      ...gameState,
      currentPiece: rotatedPiece
    };
  }

  return gameState;
};

export const lockPiece = (gameState: GameState): GameState => {
  if (!gameState.currentPiece) {
    return gameState;
  }

  const boardWithPiece = placePieceOnBoard(gameState.board, gameState.currentPiece);
  const { newBoard, linesCleared } = clearLines(boardWithPiece);

  const score = gameState.score + (linesCleared * 100 * (gameState.level + 1));
  const lines = gameState.lines + linesCleared;
  const level = Math.floor(lines / 10);

  const currentPiece = gameState.nextPiece || createTetromino(getRandomTetromino());
  const nextPiece = createTetromino(getRandomTetromino());

  // Check if the new piece can be placed
  const isGameOver = !isValidPosition(newBoard, currentPiece, currentPiece.position);

  return {
    ...gameState,
    board: newBoard,
    currentPiece: isGameOver ? null : currentPiece,
    nextPiece,
    score,
    lines,
    level,
    isGameOver
  };
};

export const createInitialGameState = (): GameState => {
  const currentPiece = createTetromino(getRandomTetromino());
  const nextPiece = createTetromino(getRandomTetromino());

  return {
    board: createEmptyBoard(),
    currentPiece,
    nextPiece,
    score: 0,
    lines: 0,
    level: 0,
    isGameOver: false,
    isPaused: false
  };
};