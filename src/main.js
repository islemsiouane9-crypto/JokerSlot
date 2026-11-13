import Phaser from 'phaser';

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
      this.load.image(
        'wizardKnight',
        '/assets/2DA643EE-8795-4BEC-8220-1CB4AE32C456.png'
      );
    },
    create() {
      const grid = this.add.graphics();
      const knight = this.add.image(0, 0, 'wizardKnight');
      knight.setVisible(true);

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

        const centerX = startX + cellSize + gap + cellSize / 2;
        const centerY = startY + cellSize + gap + cellSize / 2;
        knight.setPosition(centerX, centerY);

        const padding = cellSize * 0.18;
        const scale = Math.min(
          (cellSize - padding * 2) / knight.width,
          (cellSize - padding * 2) / knight.height
        );

        knight.setScale(scale);
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
