import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import milkinhaImage from '@/assets/milkinha.png';

interface MenuScreenProps {
  onStart: () => void;
}

export const MenuScreen = ({ onStart }: MenuScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center gap-8 animate-bounce-in">
        {/* Logo/Character */}
        <img 
          src={milkinhaImage} 
          alt="Milkinha" 
          className="w-48 h-48 object-contain"
        />

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-5xl font-bold text-primary">
            Milkinha
          </h1>
          <p className="text-lg text-muted-foreground">
            O Jogo
          </p>
        </div>

        {/* Play Button */}
        <Button 
          size="lg" 
          onClick={onStart}
          className="text-xl px-10 py-6 rounded-lg"
        >
          <Play className="w-6 h-6 mr-2" />
          Jogar
        </Button>
      </div>
    </div>
  );
};
