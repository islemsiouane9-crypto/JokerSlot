import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  backgroundColor: '#111111',
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    create() {
      const { width, height } = this.scale;

      this.add.graphics()
        .fillStyle(0x111111, 1)
        .fillRect(0, 0, width, height);

      this.add.text(width / 2, height / 2, 'READY', {
        color: '#ffffff',
        fontSize: '32px',
        fontFamily: 'Arial',
        fontStyle: 'normal'
      }).setOrigin(0.5);
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
