import { useState, useCallback } from 'react';
import { GameState, GameProgress, Position, LevelData } from '@/types/game';
import { levels } from '@/data/levels';

const STORAGE_KEY = 'milkinha-progress';

const getInitialProgress = (): GameProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading progress:', e);
  }
  return {
    currentLevel: 1,
    unlockedLevels: [1],
    completedLevels: [],
  };
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [progress, setProgress] = useState<GameProgress>(getInitialProgress);
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 });

  const saveProgress = useCallback((newProgress: GameProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }, []);

  const startGame = useCallback(() => {
    setGameState('levelSelect');
  }, []);

  const selectLevel = useCallback((levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    if (level && progress.unlockedLevels.includes(levelId)) {
      setCurrentLevelId(levelId);
      setPlayerPosition({ ...level.playerStart });
      setGameState('playing');
    }
  }, [progress.unlockedLevels]);

  const completeLevel = useCallback(() => {
    const newCompletedLevels = progress.completedLevels.includes(currentLevelId)
      ? progress.completedLevels
      : [...progress.completedLevels, currentLevelId];
    
    const nextLevel = currentLevelId + 1;
    const newUnlockedLevels = progress.unlockedLevels.includes(nextLevel) || nextLevel > 10
      ? progress.unlockedLevels
      : [...progress.unlockedLevels, nextLevel];

    const newProgress = {
      ...progress,
      completedLevels: newCompletedLevels,
      unlockedLevels: newUnlockedLevels,
    };

    setProgress(newProgress);
    saveProgress(newProgress);

    if (currentLevelId === 10) {
      setGameState('finalVictory');
    } else {
      setGameState('victory');
    }
  }, [currentLevelId, progress, saveProgress]);

  const nextLevel = useCallback(() => {
    const next = currentLevelId + 1;
    if (next <= 10) {
      selectLevel(next);
    } else {
      setGameState('finalVictory');
    }
  }, [currentLevelId, selectLevel]);

  const goToMenu = useCallback(() => {
    setGameState('menu');
  }, []);

  const goToLevelSelect = useCallback(() => {
    setGameState('levelSelect');
  }, []);

  const movePlayer = useCallback((newPosition: Position) => {
    setPlayerPosition(newPosition);
  }, []);

  const currentLevel: LevelData | undefined = levels.find(l => l.id === currentLevelId);

  return {
    gameState,
    progress,
    currentLevel,
    playerPosition,
    startGame,
    selectLevel,
    completeLevel,
    nextLevel,
    goToMenu,
    goToLevelSelect,
    movePlayer,
  };
};
