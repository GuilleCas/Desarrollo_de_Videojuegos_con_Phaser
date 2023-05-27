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
    // Audios
    this.load.audio('theme', ['assets/audio/Andrea_Milana_-_Harlequin_-_The_Clockworks_-_Electribe_MX_REMIX.mp3']);
    this.load.audio("h", ["assets/audio/h.mp3"]);

    // Imagenes
    this.load.path = './assets/';
    this.load.image(["space", "carta1", "carta2", "carta3", "carta4", "carta5", "carta6", "carta7", "carta8", "carta9", "carta10", "tapa"]);
  }

  create() {
    // Variables auxiliares para identificar los pares
    var pares1 = "";
    var pares2 = "";

    // Sound Background
    let music = this.sound.add('theme', { loop: true });
    let mario = this.sound.add('h', { loop: false });

    music.play();
    music.volume = .25;

    // Eventos
    const eventos = Phaser.Input.Events;

    // Image Background
    this.background = this.add.image(280, 160, 'space').setScale(0.6).setDepth(0);

    // CARDS

    //------------------------------------------------------- FILA 1 -------------------------------------------------------
    var CARD1_1 = this.add.image(120, 70, 'carta1').setScale(0.4).setOrigin(.5);
    var CARD10_1 = this.add.image(220, 70, 'carta10').setScale(0.4).setOrigin(.5);
    var CARD3_1 = this.add.image(320, 70, 'carta3').setScale(0.4).setOrigin(.5);
    var CARD4_1 = this.add.image(420, 70, 'carta4').setScale(0.4).setOrigin(.5);
    var CARD9_1 = this.add.image(520, 70, 'carta9').setScale(0.4).setOrigin(.5);

    //------------------------------------------------------- FILA 2 -------------------------------------------------------
    var CARD6_1 = this.add.image(120, 170, 'carta6').setScale(0.4).setOrigin(.5);
    var CARD7_1 = this.add.image(220, 170, 'carta7').setScale(0.4).setOrigin(.5);
    var CARD8_1 = this.add.image(320, 170, 'carta8').setScale(0.4).setOrigin(.5);
    var CARD5_1 = this.add.image(420, 170, 'carta5').setScale(0.4).setOrigin(.5);
    var CARD2_1 = this.add.image(520, 170, 'carta2').setScale(0.4).setOrigin(.5);

    //------------------------------------------------------- FILA 3 -------------------------------------------------------
    var CARD10_2 = this.add.image(120, 270, 'carta10').setScale(0.4).setOrigin(.5);
    var CARD8_2 = this.add.image(220, 270, 'carta8').setScale(0.4).setOrigin(.5);
    var CARD1_2 = this.add.image(320, 270, 'carta1').setScale(0.4).setOrigin(.5);
    var CARD4_2 = this.add.image(420, 270, 'carta4').setScale(0.4).setOrigin(.5);
    var CARD7_2 = this.add.image(520, 270, 'carta7').setScale(0.4).setOrigin(.5);

    //------------------------------------------------------- FILA 4 -------------------------------------------------------
    var CARD2_2 = this.add.image(120, 370, 'carta2').setScale(0.4).setOrigin(.5);
    var CARD3_2 = this.add.image(220, 370, 'carta3').setScale(0.4).setOrigin(.5);
    var CARD9_2 = this.add.image(320, 370, 'carta9').setScale(0.4).setOrigin(.5);
    var CARD6_2 = this.add.image(420, 370, 'carta6').setScale(0.4).setOrigin(.5);
    var CARD5_2 = this.add.image(520, 370, 'carta5').setScale(0.4).setOrigin(.5);

    // CARD COVERS

    //------------------------------------------------------- FILA 1 -------------------------------------------------------
    var CARTA1 = this.add.image(120, 70, 'tapa').setScale(0.4).setOrigin(.5).setInteractive();
    var CARTA2 = this.add.image(220, 70, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA3 = this.add.image(320, 70, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA4 = this.add.image(420, 70, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA5 = this.add.image(520, 70, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);

    //------------------------------------------------------- FILA 2 -------------------------------------------------------
    var CARTA6 = this.add.image(120, 170, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA7 = this.add.image(220, 170, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA8 = this.add.image(320, 170, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA9 = this.add.image(420, 170, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA10 = this.add.image(520, 170, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);

    //------------------------------------------------------- FILA 3 -------------------------------------------------------
    var CARTA11 = this.add.image(120, 270, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA12 = this.add.image(220, 270, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA13 = this.add.image(320, 270, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA14 = this.add.image(420, 270, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA15 = this.add.image(520, 270, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);

    //------------------------------------------------------- FILA 4 -------------------------------------------------------
    var CARTA16 = this.add.image(120, 370, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA17 = this.add.image(220, 370, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA18 = this.add.image(320, 370, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA19 = this.add.image(420, 370, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);
    var CARTA20 = this.add.image(520, 370, 'tapa').setInteractive().setScale(0.4).setOrigin(.5);

    // PINTA LAS CARTAS
    this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
      gameObject.setTint(0xA9A9A9);
      // reproduce el audio de las cartas
      mario.play();
      // modificamos el volumen del audio
      mario.volume = 0.16;
    });

    // DESPINTA LAS CARTAS
    this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
      gameObject.clearTint();
    });

    // CARD COVERS TO CARDS
    CARTA1.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      // audio de selección select.play();
      if (pares1 != "") {
        pares2 = 1;
      }
      else {
        pares1 = 1;
      }
      i++;
    });
    CARTA2.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      // audio de selección select.play();
      if (pares1 != "") {
        pares2 = 10;
      }
      else {
        pares1 = 10;
      }
      i++;
    });
    CARTA3.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      // audio de selección select.play();
      if (pares1 != "") {
        pares2 = 3;
      }
      else {
        pares1 = 3;
      }
      i++;
    });
    CARTA4.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 4;
      }
      else {
        pares1 = 4;
      }
      i++;
    });
    CARTA5.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 9;
      }
      else {
        pares1 = 9;
      }
      i++;
    });
    CARTA6.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 6;
      }
      else {
        pares1 = 6;
      }
      i++;
    });
    CARTA7.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 7;
      }
      else {
        pares1 = 7;
      }
      i++;
    });
    CARTA8.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 8;
      }
      else {
        pares1 = 8;
      }
      i++
    });
    CARTA9.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 5;
      }
      else {
        pares1 = 5;
      }
      i++;
    });
    CARTA10.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 2;
      }
      else {
        pares1 = 2;
      }
      i++;
    });
    CARTA11.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 10;
      }
      else {
        pares1 = 10;
      }
      i++;
    });
    CARTA12.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 8;
      }
      else {
        pares1 = 8;
      }
      i++;
    });
    CARTA13.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 1;
      }
      else {
        pares1 = 1;
      }
      i++;
    });
    CARTA14.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 4;
      }
      else {
        pares1 = 4;
      }
      i++;
    });
    CARTA15.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 7;
      }
      else {
        pares1 = 7;
      }
      i++;
    });
    CARTA16.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 2;
      }
      else {
        pares1 = 2;
      }
      i++;
    });
    CARTA17.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 3;
      }
      else {
        pares1 = 3;
      }
      i++;
    });
    CARTA18.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 9;
      }
      else {
        pares1 = 9;
      }
      i++;
    });
    CARTA19.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 6;
      }
      else {
        pares1 = 6;
      }
      i++;
    });
    CARTA20.on(eventos.POINTER_DOWN, function () {
      this.setAlpha(0);
      //audio de selección select.play();
      if (pares1 != "") {
        pares2 = 5;
      }
      else {
        pares1 = 5;
      }
      i++;
    });

    // Voltea las cartas
  }

  update(time, delta) {

  }
}

export default Bootloader;