import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINO_SHAPES,
  TETROMINO_KEYS,
  TetrominoShape,
  Tetromino,
  Position,
  GameState,
} from "@/types/tetris";

export function createEmptyBoard(): string[][] {
  return Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(""));
}

export function getRandomTetromino(): TetrominoShape {
  const randomKey =
    TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
  return TETROMINO_SHAPES[randomKey];
}

export function createTetromino(shape: TetrominoShape): Tetromino {
  return {
    ...shape,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    rotation: 0,
  };
}

export function rotatePiece(piece: Tetromino): number[][] {
  const rotatedShape = piece.shape[0].map((_, index) =>
    piece.shape.map((row) => row[index]).reverse()
  );
  return rotatedShape;
}

export function isValidMove(
  board: string[][],
  piece: Tetromino,
  newPos: Position,
  shape?: number[][]
): boolean {
  const shapeToCheck = shape || piece.shape;

  for (let y = 0; y < shapeToCheck.length; y++) {
    for (let x = 0; x < shapeToCheck[y].length; x++) {
      if (shapeToCheck[y][x]) {
        const newX = newPos.x + x;
        const newY = newPos.y + y;

        // Check boundaries
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }

        // Check collision with existing pieces (but allow pieces above the board)
        if (newY >= 0 && board[newY][newX]) {
          return false;
        }
      }
    }
  }

  return true;
}

export function placePieceOnBoard(
  board: string[][],
  piece: Tetromino
): string[][] {
  const newBoard = board.map((row) => [...row]);

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;

        if (boardY >= 0) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }

  return newBoard;
}

export function clearLines(board: string[][]): {
  newBoard: string[][];
  linesCleared: number;
} {
  const newBoard = board.filter((row) => row.some((cell) => !cell));
  const linesCleared = BOARD_HEIGHT - newBoard.length;

  // Add empty lines at the top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(""));
  }

  return { newBoard, linesCleared };
}

export function calculateScore(lines: number, level: number): number {
  const baseScores = [0, 40, 100, 300, 1200];
  return baseScores[lines] * (level + 1);
}

export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / 10);
}

export function getDropSpeed(level: number): number {
  return Math.max(50, 1000 - level * 50);
}

export function createInitialGameState(): GameState {
  return {
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: getRandomTetromino(),
    score: 0,
    level: 0,
    lines: 0,
    isGameOver: false,
    isPaused: false,
  };
}
