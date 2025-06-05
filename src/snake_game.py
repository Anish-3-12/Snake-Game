
import pygame
import random
import json
import os
import sys
from enum import Enum
from dataclasses import dataclass
from typing import List, Tuple, Optional

# Initialize Pygame
pygame.init()

# Constants
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
GRID_SIZE = 20
GRID_WIDTH = WINDOW_WIDTH // GRID_SIZE
GRID_HEIGHT = WINDOW_HEIGHT // GRID_SIZE

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)
PURPLE = (128, 0, 128)
ORANGE = (255, 165, 0)
CYAN = (0, 255, 255)
DARK_GREEN = (0, 100, 0)

class Direction(Enum):
    UP = (0, -1)
    DOWN = (0, 1)
    LEFT = (-1, 0)
    RIGHT = (1, 0)

class FruitType(Enum):
    NORMAL = "normal"
    EXTRA_LIFE = "extra_life"
    DOUBLE_POINTS = "double_points"

@dataclass
class Fruit:
    x: int
    y: int
    type: FruitType
    color: Tuple[int, int, int]
    points: int

class SnakeGame:
    def __init__(self):
        self.screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
        pygame.display.set_caption("Snake Game with Powerups")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.Font(None, 36)
        self.small_font = pygame.font.Font(None, 24)
        
        self.reset_game()
        self.leaderboard_file = "src/leaderboard.json"
        self.leaderboard = self.load_leaderboard()
        
    def reset_game(self):
        self.snake = [(GRID_WIDTH // 2, GRID_HEIGHT // 2)]
        self.direction = Direction.RIGHT
        self.fruit = None
        self.score = 0
        self.lives = 3
        self.double_points_timer = 0
        self.game_over = False
        self.paused = False
        self.username = ""
        self.spawn_fruit()
        
    def spawn_fruit(self):
        while True:
            x = random.randint(0, GRID_WIDTH - 1)
            y = random.randint(0, GRID_HEIGHT - 1)
            if (x, y) not in self.snake:
                # Determine fruit type (10% chance for special fruits)
                rand = random.random()
                if rand < 0.05:  # 5% chance for extra life
                    fruit_type = FruitType.EXTRA_LIFE
                    color = CYAN
                    points = 50
                elif rand < 0.10:  # 5% chance for double points
                    fruit_type = FruitType.DOUBLE_POINTS
                    color = PURPLE
                    points = 30
                else:  # 90% chance for normal fruit
                    fruit_type = FruitType.NORMAL
                    color = RED
                    points = 10
                    
                self.fruit = Fruit(x, y, fruit_type, color, points)
                break
                
    def handle_input(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    return False
                elif event.key == pygame.K_p:
                    self.paused = not self.paused
                elif not self.game_over and not self.paused:
                    if event.key == pygame.K_UP and self.direction != Direction.DOWN:
                        self.direction = Direction.UP
                    elif event.key == pygame.K_DOWN and self.direction != Direction.UP:
                        self.direction = Direction.DOWN
                    elif event.key == pygame.K_LEFT and self.direction != Direction.RIGHT:
                        self.direction = Direction.LEFT
                    elif event.key == pygame.K_RIGHT and self.direction != Direction.LEFT:
                        self.direction = Direction.RIGHT
                elif self.game_over:
                    if event.key == pygame.K_r:
                        self.show_leaderboard()
                        self.get_username()
                        self.reset_game()
        return True
        
    def move_snake(self):
        if self.paused or self.game_over:
            return
            
        head_x, head_y = self.snake[0]
        dx, dy = self.direction.value
        new_head = (head_x + dx, head_y + dy)
        
        # Check wall collision
        if (new_head[0] < 0 or new_head[0] >= GRID_WIDTH or 
            new_head[1] < 0 or new_head[1] >= GRID_HEIGHT):
            self.lose_life()
            return
            
        # Check self collision
        if new_head in self.snake:
            self.lose_life()
            return
            
        self.snake.insert(0, new_head)
        
        # Check fruit collision
        if new_head == (self.fruit.x, self.fruit.y):
            self.eat_fruit()
        else:
            self.snake.pop()
            
    def eat_fruit(self):
        points = self.fruit.points
        
        # Apply double points if active
        if self.double_points_timer > 0:
            points *= 2
            
        self.score += points
        
        # Handle special fruit effects
        if self.fruit.type == FruitType.EXTRA_LIFE:
            self.lives += 1
        elif self.fruit.type == FruitType.DOUBLE_POINTS:
            self.double_points_timer = 300  # 5 seconds at 60 FPS
            
        self.spawn_fruit()
        
    def lose_life(self):
        self.lives -= 1
        if self.lives <= 0:
            self.game_over = True
            self.save_score()
        else:
            # Reset snake position but keep score
            self.snake = [(GRID_WIDTH // 2, GRID_HEIGHT // 2)]
            self.direction = Direction.RIGHT
            
    def save_score(self):
        if self.username:
            self.leaderboard.append({
                "username": self.username,
                "score": self.score
            })
            self.leaderboard.sort(key=lambda x: x["score"], reverse=True)
            self.leaderboard = self.leaderboard[:10]  # Keep top 10
            self.save_leaderboard()
            
    def load_leaderboard(self):
        try:
            if os.path.exists(self.leaderboard_file):
                with open(self.leaderboard_file, 'r') as f:
                    return json.load(f)
        except:
            pass
        return []
        
    def save_leaderboard(self):
        try:
            os.makedirs(os.path.dirname(self.leaderboard_file), exist_ok=True)
            with open(self.leaderboard_file, 'w') as f:
                json.dump(self.leaderboard, f, indent=2)
        except:
            pass
            
    def get_username(self):
        input_text = ""
        input_active = True
        
        while input_active:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_RETURN:
                        if input_text.strip():
                            self.username = input_text.strip()
                            input_active = False
                    elif event.key == pygame.K_BACKSPACE:
                        input_text = input_text[:-1]
                    else:
                        if len(input_text) < 20:
                            input_text += event.unicode
                            
            self.screen.fill(BLACK)
            
            # Draw title
            title = self.font.render("Enter Your Username:", True, WHITE)
            title_rect = title.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 - 50))
            self.screen.blit(title, title_rect)
            
            # Draw input box
            input_box = pygame.Rect(WINDOW_WIDTH // 2 - 150, WINDOW_HEIGHT // 2, 300, 40)
            pygame.draw.rect(self.screen, WHITE, input_box, 2)
            
            # Draw input text
            text_surface = self.font.render(input_text, True, WHITE)
            self.screen.blit(text_surface, (input_box.x + 5, input_box.y + 5))
            
            # Draw instruction
            instruction = self.small_font.render("Press ENTER to continue", True, WHITE)
            instruction_rect = instruction.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 + 70))
            self.screen.blit(instruction, instruction_rect)
            
            pygame.display.flip()
            self.clock.tick(60)
            
    def show_leaderboard(self):
        waiting = True
        while waiting:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                elif event.type == pygame.KEYDOWN:
                    waiting = False
                    
            self.screen.fill(BLACK)
            
            # Draw title
            title = self.font.render("LEADERBOARD", True, YELLOW)
            title_rect = title.get_rect(center=(WINDOW_WIDTH // 2, 50))
            self.screen.blit(title, title_rect)
            
            # Draw leaderboard entries
            y_offset = 100
            for i, entry in enumerate(self.leaderboard):
                if i >= 10:
                    break
                text = f"{i + 1}. {entry['username']}: {entry['score']}"
                color = YELLOW if i == 0 else WHITE
                score_text = self.small_font.render(text, True, color)
                score_rect = score_text.get_rect(center=(WINDOW_WIDTH // 2, y_offset + i * 30))
                self.screen.blit(score_text, score_rect)
                
            # Draw instruction
            instruction = self.small_font.render("Press any key to continue", True, WHITE)
            instruction_rect = instruction.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT - 50))
            self.screen.blit(instruction, instruction_rect)
            
            pygame.display.flip()
            self.clock.tick(60)
            
    def draw(self):
        self.screen.fill(BLACK)
        
        # Draw snake
        for i, segment in enumerate(self.snake):
            x, y = segment
            color = GREEN if i == 0 else DARK_GREEN
            pygame.draw.rect(self.screen, color, 
                           (x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE))
                           
        # Draw fruit
        if self.fruit:
            pygame.draw.rect(self.screen, self.fruit.color,
                           (self.fruit.x * GRID_SIZE, self.fruit.y * GRID_SIZE, 
                            GRID_SIZE, GRID_SIZE))
            
            # Draw fruit type indicator
            if self.fruit.type == FruitType.EXTRA_LIFE:
                text = "+"
            elif self.fruit.type == FruitType.DOUBLE_POINTS:
                text = "2x"
            else:
                text = ""
                
            if text:
                fruit_text = self.small_font.render(text, True, WHITE)
                text_rect = fruit_text.get_rect(center=(
                    self.fruit.x * GRID_SIZE + GRID_SIZE // 2,
                    self.fruit.y * GRID_SIZE + GRID_SIZE // 2
                ))
                self.screen.blit(fruit_text, text_rect)
                
        # Draw UI
        score_text = self.font.render(f"Score: {self.score}", True, WHITE)
        self.screen.blit(score_text, (10, 10))
        
        lives_text = self.font.render(f"Lives: {self.lives}", True, WHITE)
        self.screen.blit(lives_text, (10, 50))
        
        if self.double_points_timer > 0:
            double_text = self.font.render("DOUBLE POINTS!", True, PURPLE)
            double_rect = double_text.get_rect(center=(WINDOW_WIDTH // 2, 30))
            self.screen.blit(double_text, double_rect)
            
        if self.paused:
            pause_text = self.font.render("PAUSED - Press P to resume", True, YELLOW)
            pause_rect = pause_text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2))
            self.screen.blit(pause_text, pause_rect)
            
        if self.game_over:
            game_over_text = self.font.render("GAME OVER", True, RED)
            game_over_rect = game_over_text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 - 30))
            self.screen.blit(game_over_text, game_over_rect)
            
            restart_text = self.small_font.render("Press R to restart", True, WHITE)
            restart_rect = restart_text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 + 10))
            self.screen.blit(restart_text, restart_rect)
            
        pygame.display.flip()
        
    def update(self):
        if self.double_points_timer > 0:
            self.double_points_timer -= 1
            
        self.move_snake()
        
    def run(self):
        print("Welcome to Snake Game with Powerups!")
        print("Controls:")
        print("- Arrow keys to move")
        print("- P to pause/unpause")
        print("- R to restart after game over")
        print("- ESC to quit")
        print("\nFruit Types:")
        print("- Red: Normal fruit (+10 points)")
        print("- Cyan: Extra life (+1 life, +50 points)")
        print("- Purple: Double points (2x points for 5 seconds, +30 points)")
        print("\nStarting game...")
        
        self.get_username()
        
        running = True
        while running:
            running = self.handle_input()
            self.update()
            self.draw()
            self.clock.tick(10)  # Game speed
            
        pygame.quit()

if __name__ == "__main__":
    game = SnakeGame()
    game.run()
