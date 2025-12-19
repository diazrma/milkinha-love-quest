import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import milkinhaImage from '@/assets/milkinha.png';

interface MenuScreenProps {
  onStart: () => void;
}

export const MenuScreen = ({ onStart }: MenuScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-secondary/30 to-background p-4">
      <div className="flex flex-col items-center gap-8 animate-bounce-in">
        {/* Logo/Character */}
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <img 
            src={milkinhaImage} 
            alt="Milkinha" 
            className="w-64 h-64 object-contain relative z-10 animate-float drop-shadow-2xl"
          />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-bold text-primary drop-shadow-lg">
            Milkinha
          </h1>
          <p className="text-xl text-muted-foreground">
            Uma aventura muito fofa! 🌸
          </p>
        </div>

        {/* Play Button */}
        <Button 
          size="lg" 
          onClick={onStart}
          className="text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-105 transition-transform bg-primary hover:bg-primary/90"
        >
          <Play className="w-8 h-8 mr-2" />
          Jogar
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-accent rounded-full animate-sparkle opacity-60" />
      <div className="absolute top-20 right-20 w-6 h-6 bg-primary rounded-full animate-sparkle opacity-40" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-20 left-20 w-10 h-10 bg-secondary rounded-full animate-sparkle opacity-50" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-10 right-10 w-4 h-4 bg-accent rounded-full animate-sparkle opacity-70" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};
