import { Position, LevelData } from '@/types/game';
import { useCallback, useEffect, useState } from 'react';
import milkinhaImage from '@/assets/milkinha.png';
import { Heart, Sparkles } from 'lucide-react';

interface GameBoardProps {
  level: LevelData;
  playerPosition: Position;
  onMove: (position: Position) => void;
  onReachExit: () => void;
}

export const GameBoard = ({ level, playerPosition, onMove, onReachExit }: GameBoardProps) => {
  const [isMoving, setIsMoving] = useState(false);
  const [path, setPath] = useState<Position[]>([]);

  const cellSize = Math.min(50, Math.floor(350 / Math.max(level.grid[0].length, level.grid.length)));

  const findPath = useCallback((start: Position, end: Position): Position[] => {
    const grid = level.grid;
    const rows = grid.length;
    const cols = grid[0].length;
    
    const queue: { pos: Position; path: Position[] }[] = [{ pos: start, path: [start] }];
    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current.pos.x === end.x && current.pos.y === end.y) {
        return current.path;
      }

      const directions = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
      ];

      for (const dir of directions) {
        const newX = current.pos.x + dir.x;
        const newY = current.pos.y + dir.y;
        const key = `${newX},${newY}`;

        if (
          newX >= 0 && newX < cols &&
          newY >= 0 && newY < rows &&
          grid[newY][newX] !== 1 &&
          !visited.has(key)
        ) {
          visited.add(key);
          queue.push({
            pos: { x: newX, y: newY },
            path: [...current.path, { x: newX, y: newY }],
          });
        }
      }
    }

    return [];
  }, [level.grid]);

  const handleCellClick = useCallback((x: number, y: number) => {
    if (isMoving) return;
    if (level.grid[y][x] === 1) return;

    const newPath = findPath(playerPosition, { x, y });
    if (newPath.length > 1) {
      setPath(newPath.slice(1));
      setIsMoving(true);
    }
  }, [playerPosition, level.grid, findPath, isMoving]);

  useEffect(() => {
    if (path.length > 0 && isMoving) {
      const timer = setTimeout(() => {
        const nextPos = path[0];
        onMove(nextPos);
        
        if (nextPos.x === level.exit.x && nextPos.y === level.exit.y) {
          setIsMoving(false);
          setPath([]);
          onReachExit();
          return;
        }
        
        setPath(prev => prev.slice(1));
      }, 150);

      return () => clearTimeout(timer);
    } else {
      setIsMoving(false);
    }
  }, [path, isMoving, onMove, level.exit, onReachExit]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative rounded-xl overflow-hidden shadow-xl border-4 border-primary/30"
        style={{
          width: level.grid[0].length * cellSize,
          height: level.grid.length * cellSize,
        }}
      >
        {/* Grid */}
        {level.grid.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`
                  relative flex items-center justify-center cursor-pointer transition-all duration-200
                  ${cell === 1 ? 'bg-game-wall' : 'bg-game-grass hover:bg-game-grass/80'}
                  ${cell === 2 ? 'bg-game-portal animate-pulse' : ''}
                `}
                style={{ width: cellSize, height: cellSize }}
                onClick={() => handleCellClick(x, y)}
              >
                {cell === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary-foreground animate-sparkle" />
                  </div>
                )}
                {cell === 1 && (
                  <div className="absolute inset-0 bg-gradient-to-b from-game-wall to-game-wall/70 rounded-sm" />
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Player */}
        <div
          className="absolute transition-all duration-150 ease-out z-10"
          style={{
            left: playerPosition.x * cellSize,
            top: playerPosition.y * cellSize,
            width: cellSize,
            height: cellSize,
          }}
        >
          <img 
            src={milkinhaImage} 
            alt="Milkinha" 
            className="w-full h-full object-contain animate-float drop-shadow-lg"
            style={{ transform: 'scale(1.2)' }}
          />
        </div>
      </div>

      {level.id === 10 && (
        <div className="flex gap-2 animate-pulse-heart">
          <Heart className="w-6 h-6 text-game-love fill-game-love" />
          <Heart className="w-6 h-6 text-game-love fill-game-love" />
          <Heart className="w-6 h-6 text-game-love fill-game-love" />
        </div>
      )}
    </div>
  );
};
