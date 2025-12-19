import { Button } from '@/components/ui/button';
import { Heart, Home, Sparkles } from 'lucide-react';
import milkinhaImage from '@/assets/milkinha.png';

interface FinalVictoryScreenProps {
  onMenu: () => void;
}

export const FinalVictoryScreen = ({ onMenu }: FinalVictoryScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-game-love/20 via-background to-game-love/20 p-4 overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-game-love/30 fill-game-love/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-8 z-10 animate-bounce-in">
        {/* Big Heart */}
        <div className="relative">
          <Heart className="w-32 h-32 text-game-love fill-game-love animate-pulse-heart" />
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-game-gold animate-sparkle" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-game-gold animate-sparkle" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Character */}
        <img 
          src={milkinhaImage} 
          alt="Milkinha" 
          className="w-40 h-40 object-contain animate-float drop-shadow-2xl"
        />

        {/* Main Message */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-game-love drop-shadow-lg">
            Você foi a forma mais natural que encontrei de deixar acontecer algo que sempre fez sentido.
          </h1>
          <div className="flex justify-center gap-2">
            <Heart className="w-8 h-8 text-game-love fill-game-love animate-pulse-heart" />
            <Heart className="w-10 h-10 text-game-love fill-game-love animate-pulse-heart" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-8 h-8 text-game-love fill-game-love animate-pulse-heart" style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="text-xl text-muted-foreground">
            Você completou todas as fases! 💕
          </p>
        </div>

        {/* Decorative elements */}
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <Sparkles 
              key={i} 
              className="w-6 h-6 text-game-gold animate-sparkle" 
              style={{ animationDelay: `${i * 0.3}s` }} 
            />
          ))}
        </div>

        {/* Back to menu */}
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onMenu} 
          className="rounded-full mt-4 border-game-love text-game-love hover:bg-game-love/10"
        >
          <Home className="w-5 h-5 mr-2" />
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
};
