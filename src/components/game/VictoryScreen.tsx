import { Button } from '@/components/ui/button';
import { ArrowRight, Home } from 'lucide-react';
import milkinhaImage from '@/assets/milkinha.png';

interface VictoryScreenProps {
  levelId: number;
  levelName: string;
  onNext: () => void;
  onLevelSelect: () => void;
}

export const VictoryScreen = ({ levelId, onNext, onLevelSelect }: VictoryScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center gap-6 animate-bounce-in">
        {/* Character */}
        <img 
          src={milkinhaImage} 
          alt="Milkinha" 
          className="w-28 h-28 object-contain"
        />

        {/* Message */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Fase {levelId} completa!</h1>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <Button variant="outline" size="lg" onClick={onLevelSelect}>
            <Home className="w-5 h-5 mr-2" />
            Fases
          </Button>
          <Button size="lg" onClick={onNext}>
            Próxima
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
