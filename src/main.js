import Phaser from 'phaser';

const charPaths = {
  topLeft: '/assets/2DA643EE-8795-4BEC-8220-1CB4AE32C456.png',
  topMiddle: '/assets/531AB61F-687D-4835-919B-30AB9EC292A5.png',
  topRight: '/assets/14B7E1BF-7793-4908-8645-9B385F0C2A3A.png'
};

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload() {
      Object.entries(charPaths).forEach(([key, path]) => {
        this.load.image(key, path);
      });
    },
    create() {
      const grid = this.add.graphics();
      const positions = [
        { key: 'topLeft', x: 0, y: 0 },
        { key: 'topMiddle', x: 1, y: 0 },
        { key: 'topRight', x: 2, y: 0 }
      ];

      const drawGrid = (gameSize) => {
        const { width, height } = gameSize;
        const cellSize = Math.min(120, Math.min(width, height) * 0.18);
        const gap = cellSize * 0.08;
        const gridSize = cellSize * 3 + gap * 2;
        const startX = (width - gridSize) / 2;
        const startY = (height - gridSize) / 2;

        grid.clear();
        grid.fillStyle(0x202027, 1);
        grid.lineStyle(1, 0x101015, 1);

        for (let row = 0; row < 3; row += 1) {
          for (let column = 0; column < 3; column += 1) {
            const x = startX + column * (cellSize + gap);
            const y = startY + row * (cellSize + gap);
            grid.fillRect(x, y, cellSize, cellSize);
            grid.strokeRect(x, y, cellSize, cellSize);
          }
        }

        positions.forEach(({ key, x, y }) => {
          const image = this.children.getByName(key);
          if (image) {
            image.destroy();
          }

          const cellX = startX + x * (cellSize + gap) + cellSize / 2;
          const cellY = startY + y * (cellSize + gap) + cellSize / 2;
          const sprite = this.add.image(cellX, cellY, key);
          sprite.name = key;

          const padding = cellSize * 0.18;
          const scale = Math.min(
            (cellSize - padding * 2) / sprite.width,
            (cellSize - padding * 2) / sprite.height
          );

          sprite.setScale(scale);
          sprite.setOrigin(0.5);
        });
      };

      drawGrid(this.scale.gameSize);
      this.scale.on('resize', drawGrid);
    }
  }
};

new Phaser.Game(config);

window.addEventListener('resize', () => {
  const game = Phaser.Game.getGameInstance();
  if (game) {
    game.scale.resize(window.innerWidth, window.innerHeight);
  }
});
