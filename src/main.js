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
    create() {
      const grid = this.add.graphics();

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
