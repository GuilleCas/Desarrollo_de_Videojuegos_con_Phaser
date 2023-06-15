class inicio extends Phaser.Scene {
  constructor() {
    super({
      key: 'inicio'
    });
  }

  init() {
    console.log('Escena inicio');
  }

  preload() {
    this.load.path = '../assets/Intro/';

    // Audio principal
    this.load.audio("intro", ["Title.wav"]);

    // Imagenes
    this.load.image('backgroundInicio', 'backgroundInicio.png');
    this.load.image('play', 'play.png');
  }

  create() {

    // Creación de la música
    this.intro = this.sound.add('intro', { volume: 0.5 });
    this.intro.play();

    // Creación de la imagen de fondo
    this.background = this.add.image(0, 0, 'backgroundInicio');
    this.background.setOrigin(0, 0);
    this.background.setDepth(-1);
    this.background.displayWidth = window.innerWidth;
    this.background.displayHeight = window.innerHeight;
    this.background.setAlpha(1);

    // Creación del botón
    var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play').setDepth(0);

    playButton.setInteractive();

    // Inicia la escena Bootloader cuando el usuario hace clic en el botón
    playButton.on('pointerdown', function () {
      this.scene.start('Bootloader')
    }, this);
  }

  update(time, delta) {
  }
}

export default inicio;