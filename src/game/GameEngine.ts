import { Lamp, Flower } from 'lucide-react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'player' | 'lotus' | 'lamp' | 'obstacle';
  sprite?: HTMLImageElement;
  value?: number;
}

interface GameCallbacks {
  onScoreUpdate: (score: number) => void;
  onLivesUpdate: (lives: number) => void;
  onGameOver: (finalScore: number) => void;
}

class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private player: GameObject;
  private gameObjects: GameObject[];
  private score: number = 0;
  private lives: number = 3;
  private gameLoopId: number | null = null;
  private lastTimestamp: number = 0;
  private callbacks: GameCallbacks;
  private gameWidth: number;
  private gameHeight: number;
  private isPaused: boolean = false;
  private obstacleSpeed: number = 2;
  private spawnRate: number = 1500; // ms between spawns
  private lastSpawnTime: number = 0;
  
  constructor(canvas: HTMLCanvasElement, callbacks: GameCallbacks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.callbacks = callbacks;
    
    // Setup canvas dimensions
    this.setupCanvasDimensions();
    
    // Initial game state
    this.gameWidth = this.canvas.width;
    this.gameHeight = this.canvas.height;
    
    // Create player
    this.player = {
      x: this.gameWidth / 2 - 25,
      y: this.gameHeight - 100,
      width: 50,
      height: 50,
      type: 'player',
    };
    
    this.gameObjects = [];
  }
  
  private setupCanvasDimensions() {
    // Make canvas fill its container
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.clientWidth;
      this.canvas.height = parent.clientHeight;
    } else {
      this.canvas.width = 800;
      this.canvas.height = 600;
    }
  }
  
  public init() {
    // Add event listeners for keyboard controls
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('resize', this.handleResize);
    
    // Start game loop
    this.lastTimestamp = performance.now();
    this.gameLoopId = requestAnimationFrame(this.gameLoop);
  }
  
  public destroy() {
    // Clean up
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('resize', this.handleResize);
    
    if (this.gameLoopId !== null) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }
  }
  
  private handleResize = () => {
    this.setupCanvasDimensions();
    this.gameWidth = this.canvas.width;
    this.gameHeight = this.canvas.height;
  };
  
  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.isPaused) return;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        this.movePlayer(0, -1);
        break;
      case 'ArrowDown':
      case 's':
        this.movePlayer(0, 1);
        break;
      case 'ArrowLeft':
      case 'a':
        this.movePlayer(-1, 0);
        break;
      case 'ArrowRight':
      case 'd':
        this.movePlayer(1, 0);
        break;
    }
  };
  
  public movePlayer(dx: number, dy: number) {
    if (this.isPaused) return;
    
    const moveSpeed = 20;
    const newX = this.player.x + dx * moveSpeed;
    const newY = this.player.y + dy * moveSpeed;
    
    // Boundary checks
    if (newX >= 0 && newX + this.player.width <= this.gameWidth) {
      this.player.x = newX;
    }
    
    if (newY >= 0 && newY + this.player.height <= this.gameHeight) {
      this.player.y = newY;
    }
  }
  
  private gameLoop = (timestamp: number) => {
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    
    if (!this.isPaused) {
      this.update(deltaTime);
      this.checkCollisions();
      this.spawnObjects(timestamp);
    }
    
    this.render();
    
    this.gameLoopId = requestAnimationFrame(this.gameLoop);
  };
  
  private update(deltaTime: number) {
    // Update game objects
    for (let i = this.gameObjects.length - 1; i >= 0; i--) {
      const obj = this.gameObjects[i];
      
      // Move obstacles downward
      if (obj.type === 'obstacle' || obj.type === 'lotus' || obj.type === 'lamp') {
        obj.y += this.obstacleSpeed * (deltaTime / 16);
        
        // Remove if off-screen
        if (obj.y > this.gameHeight) {
          this.gameObjects.splice(i, 1);
        }
      }
    }
    
    // Increase difficulty over time
    if (this.score > 1000) {
      this.obstacleSpeed = 2 + Math.floor(this.score / 1000);
    }
  }
  
  private spawnObjects(timestamp: number) {
    if (timestamp - this.lastSpawnTime < this.spawnRate) return;
    
    this.lastSpawnTime = timestamp;
    
    // Randomly decide what to spawn
    const rand = Math.random();
    
    if (rand < 0.4) {
      // Spawn lotus (40% chance)
      this.spawnLotus();
    } else if (rand < 0.8) {
      // Spawn lamp (40% chance)
      this.spawnLamp();
    } else {
      // Spawn obstacle (20% chance)
      this.spawnObstacle();
    }
  }
  
  private spawnLotus() {
    const lotus = {
      x: Math.random() * (this.gameWidth - 40),
      y: -50,
      width: 40,
      height: 40,
      type: 'lotus' as const,
      value: 10
    };
    
    this.gameObjects.push(lotus);
  }
  
  private spawnLamp() {
    const lamp = {
      x: Math.random() * (this.gameWidth - 40),
      y: -50,
      width: 40,
      height: 40,
      type: 'lamp' as const,
      value: 20
    };
    
    this.gameObjects.push(lamp);
  }
  
  private spawnObstacle() {
    const obstacle = {
      x: Math.random() * (this.gameWidth - 50),
      y: -60,
      width: 50,
      height: 50,
      type: 'obstacle' as const
    };
    
    this.gameObjects.push(obstacle);
  }
  
  private checkCollisions() {
    for (let i = this.gameObjects.length - 1; i >= 0; i--) {
      const obj = this.gameObjects[i];
      
      if (this.isColliding(this.player, obj)) {
        // Handle collision based on object type
        if (obj.type === 'lotus' || obj.type === 'lamp') {
          // Collected item
          this.score += obj.value || 0;
          this.callbacks.onScoreUpdate(this.score);
          
          // Remove the collected item
          this.gameObjects.splice(i, 1);
        }
        else if (obj.type === 'obstacle') {
          // Hit obstacle
          this.lives--;
          this.callbacks.onLivesUpdate(this.lives);
          
          // Remove the obstacle
          this.gameObjects.splice(i, 1);
          
          // Check game over
          if (this.lives <= 0) {
            this.endGame();
          }
        }
      }
    }
  }
  
  private isColliding(a: GameObject, b: GameObject) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
  
  private endGame() {
    this.isPaused = true;
    this.callbacks.onGameOver(this.score);
  }
  
  private render() {
    if (!this.ctx) return;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.drawBackground();
    
    // Draw game objects
    this.gameObjects.forEach(obj => {
      this.drawGameObject(obj);
    });
    
    // Draw player
    this.drawPlayer();
  }
  
  private drawBackground() {
    if (!this.ctx) return;
    
    // Draw a gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(1, '#3b82f6');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw some stars
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const radius = Math.random() * 2;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  private drawPlayer() {
    if (!this.ctx) return;
    
    // Player is represented by a character figure
    this.ctx.fillStyle = '#f8fafc';
    
    // Body
    this.ctx.beginPath();
    this.ctx.arc(
      this.player.x + this.player.width / 2,
      this.player.y + this.player.height / 2,
      this.player.width / 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
    
    // Face features
    this.ctx.fillStyle = '#1e293b';
    
    // Eyes
    this.ctx.beginPath();
    this.ctx.arc(
      this.player.x + this.player.width / 2 - 8,
      this.player.y + this.player.height / 2 - 5,
      3,
      0,
      Math.PI * 2
    );
    this.ctx.arc(
      this.player.x + this.player.width / 2 + 8,
      this.player.y + this.player.height / 2 - 5,
      3,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
    
    // Smile
    this.ctx.beginPath();
    this.ctx.arc(
      this.player.x + this.player.width / 2,
      this.player.y + this.player.height / 2 + 5,
      8,
      0,
      Math.PI
    );
    this.ctx.stroke();
  }
  
  private drawGameObject(obj: GameObject) {
    if (!this.ctx) return;
    
    switch (obj.type) {
      case 'lotus':
        // Draw a lotus flower
        this.ctx.fillStyle = '#ec4899';
        
        // Petals
        for (let i = 0; i < 8; i++) {
          this.ctx.save();
          this.ctx.translate(
            obj.x + obj.width / 2,
            obj.y + obj.height / 2
          );
          this.ctx.rotate((Math.PI / 4) * i);
          this.ctx.beginPath();
          this.ctx.ellipse(0, -10, 5, 15, 0, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        }
        
        // Center
        this.ctx.fillStyle = '#fcd34d';
        this.ctx.beginPath();
        this.ctx.arc(
          obj.x + obj.width / 2,
          obj.y + obj.height / 2,
          7,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        break;
        
      case 'lamp':
        // Draw a lamp
        this.ctx.fillStyle = '#fbbf24';
        
        // Lamp base
        this.ctx.beginPath();
        this.ctx.moveTo(obj.x + obj.width / 2, obj.y + obj.height - 10);
        this.ctx.lineTo(obj.x + 10, obj.y + obj.height);
        this.ctx.lineTo(obj.x + obj.width - 10, obj.y + obj.height);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Lamp body
        this.ctx.fillStyle = '#fef3c7';
        this.ctx.beginPath();
        this.ctx.ellipse(
          obj.x + obj.width / 2,
          obj.y + obj.height / 2 - 5,
          obj.width / 3,
          obj.height / 2,
          0,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        
        // Flame
        this.ctx.fillStyle = '#ef4444';
        this.ctx.beginPath();
        this.ctx.ellipse(
          obj.x + obj.width / 2,
          obj.y + obj.height / 3 - 5,
          5,
          8,
          0,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        break;
        
      case 'obstacle':
        // Draw an obstacle (rain cloud)
        this.ctx.fillStyle = '#64748b';
        
        // Cloud
        this.ctx.beginPath();
        this.ctx.ellipse(
          obj.x + obj.width / 2,
          obj.y + obj.height / 3,
          obj.width / 2,
          obj.height / 3,
          0,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.ellipse(
          obj.x + obj.width / 3,
          obj.y + obj.height / 2,
          obj.width / 4,
          obj.height / 4,
          0,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.ellipse(
          obj.x + (2 * obj.width) / 3,
          obj.y + obj.height / 2,
          obj.width / 4,
          obj.height / 4,
          0,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        
        // Raindrops
        this.ctx.fillStyle = '#3b82f6';
        for (let i = 0; i < 3; i++) {
          this.ctx.beginPath();
          this.ctx.ellipse(
            obj.x + (obj.width / 4) * (i + 1),
            obj.y + (2 * obj.height) / 3,
            2,
            5,
            0,
            0,
            Math.PI * 2
          );
          this.ctx.fill();
        }
        break;
    }
  }
}

export default GameEngine;