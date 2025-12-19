import { useGameState } from '@/hooks/useGameState';
import { MenuScreen } from './MenuScreen';
import { LevelSelectScreen } from './LevelSelectScreen';
import { PlayingScreen } from './PlayingScreen';
import { VictoryScreen } from './VictoryScreen';
import { FinalVictoryScreen } from './FinalVictoryScreen';
import { useCallback } from 'react';

export const Game = () => {
  const {
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
  } = useGameState();

  const handleRestart = useCallback(() => {
    if (currentLevel) {
      selectLevel(currentLevel.id);
    }
  }, [currentLevel, selectLevel]);

  switch (gameState) {
    case 'menu':
      return <MenuScreen onStart={startGame} />;
    
    case 'levelSelect':
      return (
        <LevelSelectScreen
          progress={progress}
          onSelectLevel={selectLevel}
          onBack={goToMenu}
        />
      );
    
    case 'playing':
      if (!currentLevel) return null;
      return (
        <PlayingScreen
          level={currentLevel}
          playerPosition={playerPosition}
          onMove={movePlayer}
          onReachExit={completeLevel}
          onBack={goToLevelSelect}
          onRestart={handleRestart}
        />
      );
    
    case 'victory':
      if (!currentLevel) return null;
      return (
        <VictoryScreen
          levelId={currentLevel.id}
          levelName={currentLevel.name}
          onNext={nextLevel}
          onLevelSelect={goToLevelSelect}
        />
      );
    
    case 'finalVictory':
      return <FinalVictoryScreen onMenu={goToMenu} />;
    
    default:
      return <MenuScreen onStart={startGame} />;
  }
};
