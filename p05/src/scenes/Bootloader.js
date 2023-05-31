class Bootloader extends Phaser.Scene {
  constructor() {
    super({
      key: "Bootloader",
    });
  }
  init() {
    // Creación de una matriz para toda la pantalla
    this.rejillaW0 = 0;
    this.rejillaH0 = 0;
    this.rejillaW1 = window.innerWidth / 12;
    this.rejillaH1 = window.innerHeight / 12;
    this.rejillaW2 = window.innerWidth / 6;
    this.rejillaH2 = window.innerHeight / 6;
    this.rejillaW3 = window.innerWidth / 4;
    this.rejillaH3 = window.innerHeight / 4;
    this.rejillaW4 = window.innerWidth / 3;
    this.rejillaH4 = window.innerHeight / 3;
    this.rejillaW5 = (window.innerWidth / 12) * 5;
    this.rejillaH5 = (window.innerHeight / 12) * 5;
    this.rejillaW6 = window.innerWidth / 2;
    this.rejillaH6 = window.innerHeight / 2;
    this.rejillaW7 = (window.innerWidth / 12) * 7;
    this.rejillaH7 = (window.innerHeight / 12) * 7;
    this.rejillaW8 = (window.innerWidth / 12) * 8;
    this.rejillaH8 = (window.innerHeight / 12) * 8;
    this.rejillaW9 = (window.innerWidth / 12) * 9;
    this.rejillaH9 = (window.innerHeight / 12) * 9;
    this.rejillaW10 = (window.innerWidth / 12) * 10;
    this.rejillaH10 = (window.innerHeight / 12) * 10;
    this.rejillaW11 = (window.innerWidth / 12) * 11;
    this.rejillaH11 = (window.innerHeight / 12) * 11;
    this.rejillaW11 = window.innerWidth;
    this.rejillaH11 = window.innerHeight;

    // Creación de un booleano para saber de quién es el turno
    this.turn1 = true;
    this.win = false;

    //Creación de los vectores con combinaciones ganadoras
    this.possibleWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
  }

  preload() {
    this.load.path = "./assets/";

    //Sprites de los objetos
    this.load.image(["space", "player_ship", "enemy_1", "drop"]);
    this.load.image("PWin", "player-wins.png");
    this.load.image("EWin", "enemy-wins.png");
    this.load.image("empate");

    //Sprites del gato
    this.load.image(["lasersword", "lasersword2", "lasersword3", "lasersword4"]);
    this.load.audio("music", "song.mp3");
    this.load.audio("select", "p.mp3");
  }
  create() {
    // Creando el primer turno
    this.start();

    // Creación de la música
    this.intro = this.sound.add("music", { volume: 0.25 });
    this.intro.play();

    // Creación del audio de selección
    this.select = this.sound.add("select", { volume: 0.25 });

    // Creación de fondos y configuración responsiva
    this.background = this.add.image(0, 0, "space");
    this.background.setOrigin(0, 0);
    this.background.setDepth(-1);
    this.background.displayWidth = window.innerWidth;
    this.background.displayHeight = window.innerHeight;
    this.background.setAlpha(1);

    // Creación de las imágenes "ganaste" y "perdiste"
    this.fWin = this.add.image(
      this.rejillaW11 / 2,
      this.rejillaH11 / 2,
      "PWin"
    );
    this.fWin.setDepth(-3);
    this.jWin = this.add.image(
      this.rejillaW11 / 2,
      this.rejillaH11 / 2,
      "EWin"
    );
    this.jWin.setDepth(-3);
    this.loose = this.add.image(
      this.rejillaW11 / 2,
      this.rejillaH11 / 2,
      "empate"
    );
    this.loose.setDepth(-3);

    // Creación del título de juego y configuración responsiva
    var style = { font: "3vw Courier New", fill: "#fff" };
    this.add.text(
      this.rejillaW0,
      this.rejillaH1 * 0.2,
      "Tres en linea",
      { font: "Bold 3.5vw Courier New", fill: "#fff" }
    );
    this.add.text(
      (window.innerWidth / 10) * 0.5,
      this.rejillaH3,
      "Player ship",
      style
    );
    this.add.text(
      (window.innerWidth / 10) * 7,
      this.rejillaH3,
      "Enemy ship",
      style
    );

    // Creación de los objetos movibles para player_ship
    this.player_ship1 = this.add
      .image(this.rejillaW1, this.rejillaH5, "player_ship")
      .setInteractive()
      .setScale(1.5);
    this.input.setDraggable(this.player_ship1);
    this.player_ship1.locked = false;
    this.player_ship2 = this.add
      .image(this.rejillaW2, this.rejillaH5, "player_ship")
      .setInteractive()
      .setScale(1.5);
    this.input.setDraggable(this.player_ship2);
    this.player_ship2.locked = false;
    this.player_ship3 = this.add
      .image(this.rejillaW3, this.rejillaH5, "player_ship")
      .setInteractive()
      .setScale(1.5);
    this.input.setDraggable(this.player_ship3);
    this.player_ship3.locked = false;
    this.player_ship4 = this.add
      .image(this.rejillaW1 * 1.5, this.rejillaH5 * 1.3, "player_ship")
      .setInteractive()
      .setScale(1.5);
    this.input.setDraggable(this.player_ship4);
    this.player_ship4.locked = false;
    this.player_ship5 = this.add
      .image(
        this.rejillaW2 + this.rejillaW1 * 0.5,
        this.rejillaH5 * 1.3,
        "player_ship"
      )
      .setInteractive()
      .setScale(1.5);
    this.input.setDraggable(this.player_ship5);
    this.player_ship5.locked = false;

    // Creación de los objetos movibles para enemy_1
    this.enemy_1_1 = this.add
      .image(this.rejillaW9, this.rejillaH5, "enemy_1")
      .setInteractive()
      .setScale(1.5);
    this.input.setDraggable(this.enemy_1_1);
    this.enemy_1_1.locked = false;
    this.enemy_1_2 = this.add
      .image(this.rejillaW10, this.rejillaH5, "enemy_1")
      .setInteractive()
      .setScale(1.5);
    this.input.setDraggable(this.enemy_1_2);
    this.enemy_1_2.locked = false;
    this.enemy_1_3 = this.add
      .image(this.rejillaW10 + this.rejillaW1, this.rejillaH5, "enemy_1")
      .setInteractive()
      .setScale(1.5);
    this.input.setDraggable(this.enemy_1_3);
    this.enemy_1_3.locked = false;
    this.enemy_1_4 = this.add
      .image(
        this.rejillaW9 + this.rejillaW1 * 0.5,
        this.rejillaH5 * 1.3,
        "enemy_1"
      )
      .setInteractive()
      .setScale(1.5);
    this.input.setDraggable(this.enemy_1_4);
    this.enemy_1_4.locked = false;
    this.enemy_1_5 = this.add
      .image(
        this.rejillaW10 + this.rejillaW1 * 0.5,
        this.rejillaH5 * 1.3,
        "enemy_1"
      )
      .setInteractive()
      .setScale(1.5);
    this.input.setDraggable(this.enemy_1_5);
    this.enemy_1_5.locked = false;

    // Creación del tablero del juego con "rejillas"
    this.drop1 = this.add.image(this.rejillaW5, this.rejillaH3, "drop");
    this.drop1.setDepth(-2);
    this.drop2 = this.add.image(this.rejillaW6, this.rejillaH3, "drop");
    this.drop2.setDepth(-2);
    this.drop3 = this.add.image(this.rejillaW7, this.rejillaH3, "drop");
    this.drop3.setDepth(-2);
    this.drop4 = this.add.image(this.rejillaW5, this.rejillaH5, "drop");
    this.drop4.setDepth(-2);
    this.drop5 = this.add.image(this.rejillaW6, this.rejillaH5, "drop");
    this.drop5.setDepth(-2);
    this.drop6 = this.add.image(this.rejillaW7, this.rejillaH5, "drop");
    this.drop6.setDepth(-2);
    this.drop7 = this.add.image(this.rejillaW5, this.rejillaH7, "drop");
    this.drop7.setDepth(-2);
    this.drop8 = this.add.image(this.rejillaW6, this.rejillaH7, "drop");
    this.drop8.setDepth(-2);
    this.drop9 = this.add.image(this.rejillaW7, this.rejillaH7, "drop");
    this.drop9.setDepth(-2);
    this.drop1.setInteractive();
    this.drop1.input.dropZone = true;
    this.drop1.myKey = 1;
    this.drop1.occupiedBy = 0;
    this.drop2.setInteractive();
    this.drop2.input.dropZone = true;
    this.drop2.myKey = 2;
    this.drop2.occupiedBy = 0;
    this.drop3.setInteractive();
    this.drop3.input.dropZone = true;
    this.drop3.myKey = 3;
    this.drop3.occupiedBy = 0;
    this.drop4.setInteractive();
    this.drop4.input.dropZone = true;
    this.drop4.myKey = 4;
    this.drop4.occupiedBy = 0;
    this.drop5.setInteractive();
    this.drop5.input.dropZone = true;
    this.drop5.myKey = 5;
    this.drop5.occupiedBy = 0;
    this.drop6.setInteractive();
    this.drop6.input.dropZone = true;
    this.drop6.myKey = 6;
    this.drop6.occupiedBy = 0;
    this.drop7.setInteractive();
    this.drop7.input.dropZone = true;
    this.drop7.myKey = 7;
    this.drop7.occupiedBy = 0;
    this.drop8.setInteractive();
    this.drop8.input.dropZone = true;
    this.drop8.myKey = 8;
    this.drop8.occupiedBy = 0;
    this.drop9.setInteractive();
    this.drop9.input.dropZone = true;
    this.drop9.myKey = 9;
    this.drop9.occupiedBy = 0;
    this.arrayBoard = [
      this.drop1,
      this.drop2,
      this.drop3,
      this.drop4,
      this.drop5,
      this.drop6,
      this.drop7,
      this.drop8,
      this.drop9,
    ];

    // Dibujamos las líneas
    this.line1 = this.add.image(
      this.rejillaW6 + this.rejillaW1 * 0.4,
      this.rejillaH6,
      "lasersword"
    )
      .setScale(0.35);
    this.line2 = this.add.image(
      this.rejillaW5 + this.rejillaW1 * 0.6,
      this.rejillaH4,
      "lasersword2"
    )
      .setScale(0.35);
    this.line4 = this.add.image(
      this.rejillaW5 + this.rejillaW1 * 0.5,
      this.rejillaH5 + this.rejillaH1 * 0.8,
      "lasersword4"
    )
      .setScale(0.35);
    this.line3 = this.add.image(
      this.rejillaW6 + this.rejillaW1 * 0.5,
      this.rejillaH4 + this.rejillaH1 * 0.2,
      "lasersword3"
    )
      .setScale(0.35);

    // Creación de indicadores de texto por turnos
    this.turn1text = this.add.text(
      this.rejillaW1,
      this.rejillaH8,
      "Es tu turno",
      { font: "2vw Courier New", fill: "#fff" }
    );
    this.turn2text = this.add.text(
      this.rejillaW9,
      this.rejillaH8,
      "Es tu turno",
      { font: "2vw Courier New", fill: "#fff" }
    );

    const eventos = Phaser.Input.Events;
    this.input.on(eventos.DRAG_START, (pointer, obj, dragX, dragY) => {
      obj.setScale(0.9);
      this.select.play();
    });
    this.input.on(eventos.DRAG, (pointer, obj, dragX, dragY) => {
      obj.x = dragX;
      obj.y = dragY;
    });
    this.input.on(eventos.DRAG_END, (pointer, obj, dropzone) => {
      if (!dropzone) {
        obj.x = obj.input.dragStartX;
        obj.y = obj.input.dragStartY;
      }
      obj.setScale(1.5);
    });
    this.input.on(eventos.DRAG_ENTER, (pointer, obj, dropzone) => {
      dropzone.setTint(0xff0000);
    });
    this.input.on(eventos.DRAG_LEAVE, (pointer, obj, dropzone) => {
      dropzone.clearTint();
    });
    this.input.on(eventos.DROP, (pointer, obj, dropzone) => {
      if (dropzone.occupiedBy == 0) {
        obj.x = dropzone.x;
        obj.y = dropzone.y;
        if (
          obj == this.player_ship1 ||
          obj == this.player_ship2 ||
          obj == this.player_ship3 ||
          obj == this.player_ship4 ||
          obj == this.player_ship5
        ) {
          dropzone.occupiedBy = 1;
          obj.locked = true;
          this.turn1 = false;
          this.winner(1);
        } else if (
          obj == this.enemy_1_1 ||
          obj == this.enemy_1_2 ||
          obj == this.enemy_1_3 ||
          obj == this.enemy_1_4 ||
          obj == this.enemy_1_5
        ) {
          dropzone.occupiedBy = 2;
          obj.locked = true;
          this.turn1 = true;
          this.winner(2);
        }
      } else {
        obj.x = obj.input.dragStartX;
        obj.y = obj.input.dragStartY;
      }
      this.checkEnd();
    });

    // Creación del evento para reiniciar el juego
    const keyCodes = Phaser.Input.Keyboard.KeyCodes;
    this.teclaEnter = this.input.keyboard.addKey(keyCodes.ENTER);
  }

  // Para elegir quien va iniciar el juego
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  start() {
    var num = this.getRandomArbitrary(1, 100);
    if (num < 50) {
      this.turn1 = true;
    } else {
      this.turn1 = false;
    }
  }

  turns() {
    if (this.turn1) {
      this.input.setDraggable(this.enemy_1_1, false);
      this.input.setDraggable(this.enemy_1_2, false);
      this.input.setDraggable(this.enemy_1_3, false);
      this.input.setDraggable(this.enemy_1_4, false);
      this.input.setDraggable(this.enemy_1_5, false);
      if (!this.player_ship1.locked) {
        this.input.setDraggable(this.player_ship1);
      }
      if (!this.player_ship2.locked) {
        this.input.setDraggable(this.player_ship2);
      }
      if (!this.player_ship3.locked) {
        this.input.setDraggable(this.player_ship3);
      }
      if (!this.player_ship4.locked) {
        this.input.setDraggable(this.player_ship4);
      }
      if (!this.player_ship5.locked) {
        this.input.setDraggable(this.player_ship5);
      }
      this.turn1text.setAlpha(1);
      this.turn2text.setAlpha(0);
    } else {
      this.input.setDraggable(this.player_ship1, false);
      this.input.setDraggable(this.player_ship2, false);
      this.input.setDraggable(this.player_ship3, false);
      this.input.setDraggable(this.player_ship4, false);
      this.input.setDraggable(this.player_ship5, false);
      if (!this.enemy_1_1.locked) {
        this.input.setDraggable(this.enemy_1_1);
      }
      if (!this.enemy_1_2.locked) {
        this.input.setDraggable(this.enemy_1_2);
      }
      if (!this.enemy_1_3.locked) {
        this.input.setDraggable(this.enemy_1_3);
      }
      if (!this.enemy_1_4.locked) {
        this.input.setDraggable(this.enemy_1_4);
      }
      if (!this.enemy_1_5.locked) {
        this.input.setDraggable(this.enemy_1_5);
      }
      this.turn1text.setAlpha(0);
      this.turn2text.setAlpha(1);
    }
  }

  winner(playerID) {
    for (var i = 0; i < this.possibleWins.length; i++) {
      var winLine = this.possibleWins[i];

      if (
        this.arrayBoard[winLine[0]].occupiedBy == playerID &&
        this.arrayBoard[winLine[1]].occupiedBy == playerID &&
        this.arrayBoard[winLine[2]].occupiedBy == playerID
      ) {
        this.win = true;
        this.showWinner(playerID);
      }
    }
  }

  showWinner(playerID) {
    if (playerID == 1) {
      this.fWin.setDepth(3);
    }
    if (playerID == 2) {
      this.jWin.setDepth(3);
    }
  }

  checkEnd() {
    let statusGame = false;
    for (var i = 0; i < 9; i++) {
      if (this.arrayBoard[i].occupiedBy == 0) {
        statusGame = true;
      }
    }
    if (!statusGame && !this.win) {
      this.loose.setDepth(3);
    }
  }

  update(time, delta) {
    this.turns();
    if (Phaser.Input.Keyboard.JustDown(this.teclaEnter)) {
      this.time.addEvent({
        callbackScope: this,
        callback: function () {
          this.turn1 = true;
          this.win = false;
          this.intro.stop();
          this.scene.restart();
        },
      });
    }
  }
}

export default Bootloader;