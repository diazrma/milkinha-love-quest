import { LevelData, Position } from '@/types/game';
import { GameBoard } from './GameBoard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface PlayingScreenProps {
  level: LevelData;
  playerPosition: Position;
  onMove: (position: Position) => void;
  onReachExit: () => void;
  onBack: () => void;
  onRestart: () => void;
}

export const PlayingScreen = ({
  level,
  playerPosition,
  onMove,
  onReachExit,
  onBack,
  onRestart,
}: PlayingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-game-sky/30 to-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-primary/20">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">Fase {level.id}</h2>
          <p className="text-sm text-muted-foreground">{level.name}</p>
        </div>
        
        <Button variant="ghost" size="icon" onClick={onRestart} className="hover:bg-primary/20">
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      {/* Game Board */}
      <GameBoard
        level={level}
        playerPosition={playerPosition}
        onMove={onMove}
        onReachExit={onReachExit}
      />

      {/* Instructions */}
      <p className="mt-6 text-sm text-muted-foreground text-center">
        Clique em um lugar para mover a Milkinha! ✨
      </p>
    </div>
  );
};
