export type GameMode = 'easy' | 'medium' | 'pro';

export type GameState = 'instructions' | 'modeSelection' | 'playing' | 'gameOver';

export interface GameWords {
  easy: string[];
  medium: string[];
  pro: string[];
}