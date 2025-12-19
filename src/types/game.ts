export interface Position {
  x: number;
  y: number;
}

export interface LevelData {
  id: number;
  name: string;
  grid: number[][];
  playerStart: Position;
  exit: Position;
}

export type CellType = 
  | 0  // empty/walkable
  | 1  // wall
  | 2  // exit/portal
  | 3; // decoration

export type GameState = 'menu' | 'levelSelect' | 'playing' | 'victory' | 'finalVictory';

export interface GameProgress {
  currentLevel: number;
  unlockedLevels: number[];
  completedLevels: number[];
}
