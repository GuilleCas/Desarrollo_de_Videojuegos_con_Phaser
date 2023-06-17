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
    this.load.path = './assets/CharacterMenu/';

    // Audios
    this.load.audio('select', 'audio/bookFlip1.ogg');
    this.load.audio('selected', 'audio/clothBelt.ogg');
    this.load.audio('footstep07', 'audio/footstep07.ogg');
    this.load.audio('footstep08', 'audio/footstep08.ogg');
    this.load.audio('footstep09', 'audio/footstep09.ogg');

    // Background
    this.load.image('background', 'img/background.png');

    // Animación de los personajes
    this.load.atlas('healer', 'healer_atlas/healer.png', 'healer_atlas/healer_atlas.json');
    this.load.animation('healerAnim', 'healer_atlas/healer_anim.json');

    this.load.atlas('mage', 'mage_atlas/mage.png', 'mage_atlas/mage_atlas.json');
    this.load.animation('mageAnim', 'mage_atlas/mage_anim.json');

    this.load.atlas('ranger', 'ranger_atlas/ranger.png', 'ranger_atlas/ranger_atlas.json');
    this.load.animation('rangerAnim', 'ranger_anim.json');

    // Sprites de los personajes
    this.images = ['healer', 'mage', 'ranger'];

  }

  create() {
    // Creación de la música
    this.select = this.sound.add('select', { loop: false });
    this.selected = this.sound.add('selected', { loop: false });
    this.footstep07 = this.sound.add('footstep07', { loop: false });
    this.footstep08 = this.sound.add('footstep08', { loop: false });
    this.footstep09 = this.sound.add('footstep09', { loop: false });

    this.w = this.scale.width;
    this.h = this.scale.height;

    this.character = 0;
    this.rectangles = [];
    this.graphics;
    this.images_ = [];
    this.characterSelected = false;
    this.names = [];

    var confText = { fontFamily: "Courier New", color: '#ffffff', fontSize: "15px", stroke: "#000" };
    var confTextC = { fontFamily: "Courier New", color: '#ffffff', fontSize: "40px", stroke: "#000" };

    // Creación del fondo
    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0).setDepth(0);
    this.background.displayWidth = window.innerWidth;
    this.background.displayHeight = window.innerHeight;
    this.background.setAlpha(1);

    // Creación del texto
    this.instructions = this.add.text(this.w / 8, 40, "ESC = Volver a selección\nIzquierda = Caminar\nDerecha = Caminar\nArriba = Caminar", confText).setTint(0xf8961e);
    this.instructions.setOrigin(.5);

    // Creación de los contenedores
    for (let i = 0; i < 3; i++) {
      var rectangle = this.add.rectangle(this.w / 3 * i, 100, this.w / 3, this.h - 230).setOrigin(0, 0);
      rectangle.setStrokeStyle(5, 0xffb703);
      rectangle.setInteractive();
      rectangle.character = i;
      this.rectangles.push(rectangle);
    }

    // Colocando los sprites de los personajes
    var image = this.add.sprite(this.w / 6, 300, this.images[0]).setScale(7);
    image.character = 0;
    image.setDepth(1);
    this.images_.push(image);

    var text = this.add.text(this.w / 6, 130, 'Healer', confTextC).setOrigin(.5);
    text.setDepth(1);
    this.names.push(text);

    var image2 = this.add.sprite(this.w / 6 * 3, 300, this.images[1]).setScale(7);
    image2.character = 1;
    image2.setDepth(1)
    this.images_.push(image2);

    var text = this.add.text(this.w / 6 * 3, 130, 'Mage', confTextC).setOrigin(.5);
    text.setDepth(1);
    this.names.push(text);

    var image3 = this.add.sprite(this.w / 6 * 5, 300, this.images[2]).setScale(7);
    image3.character = 2;
    image3.setDepth(1);
    this.images_.push(image3);

    var text = this.add.text(this.w / 6 * 5, 130, 'Ranger', confTextC).setOrigin(.5);
    text.setDepth(1);
    this.names.push(text);

    this.select.play();

    for (let i = 0; i < 3; i++) {
      this.rectangles[i].on('pointerover', () => {
        this.character = this.rectangles[i].character;
        this.addGraphic(this.rectangles[i].x, this.rectangles[i].y, 1000, -1);
        this.select.play();
      });
      this.rectangles[i].on('pointerout', () => {
        this.graphics.destroy();
      });
      this.rectangles[i].on('pointerdown', this.objPointerDown, this);
    }

    // Asignacion de teclas
    this.teclaEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.teclaUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.teclaLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.teclaRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.teclaEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.teclaEsc.on('up', () => {
      if (this.characterSelected != false) {
        this.graphics.destroy();
        this.characterSelected = false;

        for (let i = 0; i < this.rectangles.length; i++) {
          this.rectangles[i].setVisible(true);
          this.images_[i].setVisible(true);
          this.rectangles[i].on('pointerover', () => {
            this.character = this.rectangles[i].character;
            this.addGraphic(this.rectangles[i].x, this.rectangles[i].y, 1000, -1);

            this.select.play();
          });
          this.rectangles[i].on('pointerout', () => { this.graphics.destroy(); });
          this.rectangles[i].on('pointerdown', this.objPointerDown, this);
          this.names[i].setVisible(true);
        }
        this.showText(this.instructions, 255, 0);
        this.images_[this.character].anims.stop();
        this.turnOffSounds();
      }
    });

  }

  /**
    * La función addGraphic añade un elemento gráfico con un color y animación especificados a un objeto del juego.
    * @param x - La coordenada x de la posición donde se añadirá el gráfico en la pantalla.
    * @param y - La coordenada y de la posición donde se añadirá el gráfico en la pantalla.
    * @param [defaultime=200] - El tiempo por defecto (en milisegundos) para que el gráfico se desvanezca
    * @param [repeat=3] -  El parámetro "repeat" especifica cuántas veces el gráfico debe repetir la animación.
    */

  addGraphic(x, y, defaultime = 200, repeat = 3) {
    var color;
    switch (this.character) {
      case 0: color = 0x9a031e; break;
      case 1: color = 0xfb8b24; break;
      case 2: color = 0xe36414; break;
    }
    this.graphics = this.add.graphics({
      x: x,
      y: y
    }).fillStyle(color, 0.75).fillRect(0, 0, this.w / 3, this.h - 230);
    this.tweens.add({
      targets: this.graphics,
      alpha: 0,
      ease: 'curved',
      duration: defaultime,
      repeat: repeat
    });
    this.graphics.setDepth(0);
  }

  /*
   * La función objPointerDown activa los sonidos y muestra las instrucciones cuando se selecciona un 
   * personaje.
   */

  objPointerDown(pointer, targets) {
    this.offGraphic(this.character);

    this.characterSelected = true;
    this.showText(this.instructions, 0, 255);
    this.turnOnSounds();
    this.selected.play();
  }

  objPointerOver(pointer, targets) {
    this.character = targets[0].character;
    this.addGraphic(targets[0].x, targets[0].y, 1000, -1);
  }

  objPointerOut(pointer, targets) {
    this.graphics.destroy();
  }

  /**
   * La función offGraphic destruye gráficos, oculta un elemento, establece un color, añade un gráfico y
   * elimina eventos de puntero para los rectangulos.
   * @param index - El parámetro index es un entero que representa el índice de un rectángulo en un
   * arreglo. Se utiliza para determinar sobre qué rectángulo realizar acciones en la función offGraphic.
   */

  offGraphic(index) {
    this.graphics.destroy();
    this.hide(index);
    var color;

    switch (this.character) {
      case 0: color = 0x9a031e; break;
      case 1: color = 0xfb8b24; break;
      case 2: color = 0xe36414; break;
    }
    this.addGraphic(this.rectangles[index].x, this.rectangles[index].y);

    for (let i = 0; i < 3; i++) {
      this.rectangles[i].off('pointerover');
      this.rectangles[i].off('pointerout');
      this.rectangles[i].off('pointerdown');
    }
    this.addColor(this.rectangles[index].x, this.rectangles[index].y);
  }

  /**
   * La función añade un rectángulo de color a un objeto gráfico con un retardo de 600 milisegundos..
   * @param x - La coordenada x donde se posicionará el objeto gráfico en la pantalla.
   * @param y - El parámetro "y" es la posición vertical donde el
   * gráfico se añadirá en la pantalla.
   */

  addColor(x, y) {
    var color;
    switch (this.character) {
      case 0: color = 0x9a031e; break;
      case 1: color = 0xfb8b24; break;
      case 2: color = 0xe36414; break;
    }
    setTimeout(() => {
      this.graphics = this.add.graphics({
        x: x,
        y: y
      }).fillStyle(color, 0.75).fillRect(0, 0, this.w / 3, this.h - 230);
    }, 600);
  }

  showText(obj, from, to) {
    this.tweens.addCounter({
      from: from,
      to: to,
      duration: 1000,
      onUpdate: function (tween) {
        var value = Math.floor(tween.getValue());
        obj.setTint(Phaser.Display.Color.GetColor(value, value, value));
        obj.setTint(Phaser.Display.Color.GetColor(value, value, value));
      }
    });
  }

  hide(index) {
    for (let i = 0; i < 3; i++) {
      if (this.rectangles[i].character != index) {
        this.rectangles[i].setVisible(false);
        this.images_[i].setVisible(false);
        this.names[i].setVisible(false);
      }
    }
  }

  turnOnSounds() {
    this.teclaLeft.on('down', () => { this.footstep07.play({ loop: true }); });
    this.teclaLeft.on('up', () => { this.footstep07.stop(); });
    this.teclaRight.on('down', () => { this.footstep08.play({ loop: true }); });
    this.teclaRight.on('up', () => { this.footstep08.stop(); });
    this.teclaUp.on('down', () => { this.footstep09.play({ loop: true }); });
    this.teclaUp.on('up', () => { this.footstep09.stop(); });
  }

  turnOffSounds() {
    this.teclaLeft.off('down');
    this.teclaLeft.off('up');
    this.teclaRight.off('down');
    this.teclaRight.off('up');
    this.teclaUp.off('down');
    this.teclaUp.off('up');
  }

  update(time, delta) {
    if (this.characterSelected) {
      if (this.teclaUp.isDown) {
        this.images_[this.character].anims.play(`${this.images[this.character]}_back`, true);
      }
      else if (this.teclaLeft.isDown) {
        this.images_[this.character].anims.play(`${this.images[this.character]}_walkl`, true);
      }
      else if (this.teclaRight.isDown) {
        this.images_[this.character].anims.play(`${this.images[this.character]}_walkr`, true);
      }
      else if (this.teclaEnter.isDown) {
        this.scene.start('episode1');
      }
      else {
        this.images_[this.character].anims.play(`${this.images[this.character]}_idle`, true);
      }
    }
  }
}

export default Bootloader;