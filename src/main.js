import Phaser from 'phaser';

const charPaths = {
  demonRook: '/assets/2DA643EE-8795-4BEC-8220-1CB4AE32C456.png',
  sniperBishop: '/assets/531AB61F-687D-4835-919B-30AB9EC292A5.png',
  wizardKnight: '/assets/14B7E1BF-7793-4908-8645-9B385F0C2A3A.png'
};

const cellCharacters = [
  ['demonRook', 'sniperBishop', 'wizardKnight'],
  ['sniperBishop', 'wizardKnight', 'demonRook'],
  ['wizardKnight', 'demonRook', 'sniperBishop']
];

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
      const sprites = cellCharacters.map((row) =>
        row.map((key) => this.add.image(0, 0, key).setOrigin(0.5))
      );

      const drawGrid = (gameSize) => {
        const { width, height } = gameSize;
        const cellSize = Math.min(120, Math.min(width, height) * 0.18);
        const gap = cellSize * 0.08;
        const gridSize = cellSize * 3 + gap * 2;
        const startX = (width - gridSize) / 2;
        const startY = (height - gridSize) / 2;
        const padding = cellSize * 0.18;
        const imageSize = cellSize - padding * 2;

        grid.clear();
        grid.fillStyle(0x202027, 1);
        grid.lineStyle(1, 0x101015, 1);

        for (let row = 0; row < 3; row += 1) {
          for (let column = 0; column < 3; column += 1) {
            const x = startX + column * (cellSize + gap);
            const y = startY + row * (cellSize + gap);
            grid.fillRect(x, y, cellSize, cellSize);
            grid.strokeRect(x, y, cellSize, cellSize);

            const sprite = sprites[row][column];
            sprite.setPosition(x + cellSize / 2, y + cellSize / 2);
            const scale = Math.min(imageSize / sprite.width, imageSize / sprite.height);
            sprite.setScale(scale);
          }
        }
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
