
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { GameLevel, LEVEL_CONFIGS } from '@/components/LevelSelector';

const GRID_SIZE = 20;

interface Position {
  x: number;
  y: number;
}

interface Fruit {
  position: Position;
  type: 'normal' | 'extra_life' | 'double_points';
  points: number;
}

export const useGameLogic = (currentLevel: GameLevel) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [snake, setSnake] = useState<Position[]>([]);
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [fruit, setFruit] = useState<Fruit | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [doublePointsTimer, setDoublePointsTimer] = useState(0);

  const levelConfig = LEVEL_CONFIGS[currentLevel];
  const CANVAS_WIDTH = levelConfig.canvasWidth;
  const CANVAS_HEIGHT = levelConfig.canvasHeight;
  const GRID_WIDTH = CANVAS_WIDTH / GRID_SIZE;
  const GRID_HEIGHT = CANVAS_HEIGHT / GRID_SIZE;

  const initializeGame = useCallback(() => {
    const centerX = Math.floor(GRID_WIDTH / 2);
    const centerY = Math.floor(GRID_HEIGHT / 2);
    setSnake([{ x: centerX, y: centerY }]);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setLives(3);
    setGameOver(false);
    setPaused(false);
    setDoublePointsTimer(0);
    setFruit(null);
  }, [GRID_WIDTH, GRID_HEIGHT]);

  useEffect(() => {
    initializeGame();
  }, [currentLevel, initializeGame]);

  const generateFruit = useCallback(() => {
    let newPosition: Position;
    do {
      newPosition = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
      };
    } while (snake.some(segment => segment.x === newPosition.x && segment.y === newPosition.y));

    const rand = Math.random();
    let fruitType: 'normal' | 'extra_life' | 'double_points';
    let points: number;

    if (rand < 0.05) {
      fruitType = 'extra_life';
      points = 50;
    } else if (rand < 0.10) {
      fruitType = 'double_points';
      points = 30;
    } else {
      fruitType = 'normal';
      points = 10;
    }

    setFruit({ position: newPosition, type: fruitType, points });
  }, [snake, GRID_WIDTH, GRID_HEIGHT]);

  const saveScore = async (finalScore: number) => {
    if (!user) return;

    const multipliedScore = Math.floor(finalScore * levelConfig.multiplier);

    try {
      const { error } = await supabase
        .from('scores')
        .insert({
          user_id: user.id,
          score: multipliedScore
        });

      if (error) {
        console.error('Error saving score:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save your score. Please try again.",
        });
      } else {
        toast({
          title: "Score Saved!",
          description: `Your score of ${multipliedScore} has been saved to the leaderboard.`,
        });
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    initializeGame();
  };

  const startGame = () => {
    setGameStarted(true);
    generateFruit();
  };

  const gameLoop = useCallback(() => {
    if (!gameStarted || paused || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
        setLives(currentLives => {
          const newLives = currentLives - 1;
          if (newLives <= 0) {
            setGameOver(true);
            if (user) {
              saveScore(score);
            }
          } else {
            // Reset snake position
            const centerX = Math.floor(GRID_WIDTH / 2);
            const centerY = Math.floor(GRID_HEIGHT / 2);
            setSnake([{ x: centerX, y: centerY }]);
            setDirection({ x: 1, y: 0 });
          }
          return newLives;
        });
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setLives(currentLives => {
          const newLives = currentLives - 1;
          if (newLives <= 0) {
            setGameOver(true);
            if (user) {
              saveScore(score);
            }
          } else {
            // Reset snake position
            const centerX = Math.floor(GRID_WIDTH / 2);
            const centerY = Math.floor(GRID_HEIGHT / 2);
            setSnake([{ x: centerX, y: centerY }]);
            setDirection({ x: 1, y: 0 });
          }
          return newLives;
        });
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check fruit collision
      if (fruit && head.x === fruit.position.x && head.y === fruit.position.y) {
        let points = fruit.points;
        if (doublePointsTimer > 0) {
          points *= 2;
        }

        setScore(prevScore => prevScore + points);

        if (fruit.type === 'extra_life') {
          setLives(prevLives => prevLives + 1);
        } else if (fruit.type === 'double_points') {
          setDoublePointsTimer(300); // 5 seconds at 60fps
        }

        generateFruit();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });

    setDoublePointsTimer(prev => Math.max(0, prev - 1));
  }, [direction, fruit, gameStarted, paused, gameOver, doublePointsTimer, score, user, generateFruit, saveScore, GRID_WIDTH, GRID_HEIGHT]);

  useEffect(() => {
    const interval = setInterval(gameLoop, levelConfig.speed);
    return () => clearInterval(interval);
  }, [gameLoop, levelConfig.speed]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;

      switch (e.key.toLowerCase()) {
        case 'arrowup':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'arrowdown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'arrowleft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'arrowright':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case 'w':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 's':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'a':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'd':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);

  return {
    snake,
    direction,
    fruit,
    score,
    lives,
    gameOver,
    gameStarted,
    paused,
    doublePointsTimer,
    levelConfig,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    GRID_SIZE,
    resetGame,
    startGame,
    setPaused,
    user
  };
};
