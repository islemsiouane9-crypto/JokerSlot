import Phaser from 'phaser';

const wizardKnightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path d="M34 115h60l-6-10H40z" fill="#c7c7d1" stroke="#858592" stroke-width="3" stroke-linejoin="round"/>
  <path d="M43 105h42l-5-9H48z" fill="#a4a4b0" stroke="#858592" stroke-width="3" stroke-linejoin="round"/>
  <path d="M49 96c2-9 0-17-7-24-5-5-8-12-6-21l8-21 17 10 18 2 15 13-7 12c-3 5-7 9-13 12l-3 17z" fill="#e6e6ed" stroke="#858592" stroke-width="3" stroke-linejoin="round"/>
  <path d="M39 54c8 2 14 0 18-5l7-9-13-10-12 8-5 14z" fill="#c7c7d1" stroke="#858592" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="48" cy="43" r="2.5" fill="#202027"/>
  <path d="M50 29 69 8l17 31c-10-5-22-6-36-2z" fill="#7757bd" stroke="#4c367e" stroke-width="3" stroke-linejoin="round"/>
  <path d="M46 39c12-7 29-8 43-2l-2 8c-15-5-29-4-42 2z" fill="#9a7ce0" stroke="#4c367e" stroke-width="3" stroke-linejoin="round"/>
  <path d="m68 11 4 7" stroke="#eee7ff" stroke-width="3" stroke-linecap="round"/>
</svg>`;

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
      const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(wizardKnightSvg)}`;
      this.load.svg('wizard-knight', svgUrl, { width: 128, height: 128 });
    },
    create() {
      const grid = this.add.graphics();
      const knight = this.add.image(0, 0, 'wizard-knight');

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
        knight.setDisplaySize(cellSize * 0.68, cellSize * 0.68);
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
