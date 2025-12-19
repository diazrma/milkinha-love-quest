import { Button } from '@/components/ui/button';
import { GameProgress } from '@/types/game';
import { levels } from '@/data/levels';
import { Lock, Star, ArrowLeft, Heart } from 'lucide-react';

interface LevelSelectScreenProps {
  progress: GameProgress;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

export const LevelSelectScreen = ({ progress, onSelectLevel, onBack }: LevelSelectScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-secondary/30 to-background p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-primary/20">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-bold text-primary">Escolha a Fase</h1>
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-5 gap-3">
          {levels.map((level) => {
            const isUnlocked = progress.unlockedLevels.includes(level.id);
            const isCompleted = progress.completedLevels.includes(level.id);
            const isFinal = level.id === 10;

            return (
              <Button
                key={level.id}
                variant={isCompleted ? "default" : isUnlocked ? "secondary" : "outline"}
                className={`
                  relative w-14 h-14 p-0 text-xl font-bold rounded-xl
                  ${isCompleted ? 'bg-game-gold hover:bg-game-gold/90 text-foreground' : ''}
                  ${isFinal && isUnlocked ? 'bg-game-love hover:bg-game-love/90 text-primary-foreground' : ''}
                  ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 transition-transform'}
                `}
                onClick={() => isUnlocked && onSelectLevel(level.id)}
                disabled={!isUnlocked}
              >
                {!isUnlocked ? (
                  <Lock className="w-5 h-5" />
                ) : isFinal ? (
                  <Heart className="w-6 h-6 fill-current" />
                ) : (
                  level.id
                )}
                {isCompleted && (
                  <Star className="absolute -top-1 -right-1 w-4 h-4 text-primary fill-primary" />
                )}
              </Button>
            );
          })}
        </div>

        {/* Level names */}
        <div className="mt-8 space-y-2">
          {levels.map((level) => {
            const isUnlocked = progress.unlockedLevels.includes(level.id);
            if (!isUnlocked) return null;
            
            return (
              <div 
                key={level.id} 
                className="text-sm text-muted-foreground flex items-center gap-2"
              >
                <span className="font-bold text-primary">{level.id}.</span>
                <span>{level.name}</span>
                {level.id === 10 && <Heart className="w-4 h-4 text-game-love fill-game-love" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
