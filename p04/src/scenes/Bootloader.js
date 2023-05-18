class Bootloader extends Phaser.Scene {
  constructor() {
    super({
      key: 'Bootloader'
    });
  }

  init() {
    console.log('Escena Bootloader');
  }

  preload() {
    //Audios
    this.load.audio('theme', ['assets/audio/Andrea_Milana_-_Harlequin_-_The_Clockworks_-_Electribe_MX_REMIX.mp3']);
    this.load.audio("h", ["assets/audio/h.mp3"]);

    //Imagenes
    this.load.path = './assets/';
    this.load.image(["space"]);

  }

  create() {

    //Sound Background
    let music = this.sound.add('theme', { loop: true });
    let mario = this.sound.add('h', { loop: false });

    music.play();
    music.volume = .25;

    //Eventos
    const eventos = Phaser.Input.Events;

    //Image Background
    this.background = this.add.image(280, 160, 'space').setScale(0.6).setDepth(0);

    //CARDS

  }

  update(time, delta) {

  }
}

export default Bootloader;