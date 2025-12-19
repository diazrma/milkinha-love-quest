import { Button } from '@/components/ui/button';
import { Star, ArrowRight, Home } from 'lucide-react';
import milkinhaImage from '@/assets/milkinha.png';

interface VictoryScreenProps {
  levelId: number;
  levelName: string;
  onNext: () => void;
  onLevelSelect: () => void;
}

export const VictoryScreen = ({ levelId, levelName, onNext, onLevelSelect }: VictoryScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-game-gold/20 to-background p-4">
      <div className="flex flex-col items-center gap-6 animate-bounce-in">
        {/* Stars */}
        <div className="flex gap-2">
          <Star className="w-12 h-12 text-game-gold fill-game-gold animate-sparkle" />
          <Star className="w-16 h-16 text-game-gold fill-game-gold animate-sparkle" style={{ animationDelay: '0.2s' }} />
          <Star className="w-12 h-12 text-game-gold fill-game-gold animate-sparkle" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Character */}
        <img 
          src={milkinhaImage} 
          alt="Milkinha" 
          className="w-32 h-32 object-contain animate-float"
        />

        {/* Message */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Parabéns!</h1>
          <p className="text-xl text-foreground">Você completou a Fase {levelId}!</p>
          <p className="text-muted-foreground">{levelName}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <Button variant="outline" size="lg" onClick={onLevelSelect} className="rounded-full">
            <Home className="w-5 h-5 mr-2" />
            Fases
          </Button>
          <Button size="lg" onClick={onNext} className="rounded-full bg-primary hover:bg-primary/90">
            Próxima
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
