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
        this.load.path = './assets/';
        this.load.image('background', 'space.png');
        this.load.image(['boss1', 'enemy_1', 'enemy_2', 'enemy_3', 'player_ship']);
    }

    create() {
        this.background = this.add.image(280, 160, 'background').setScale(0.4);

        this.boss1 = this.add.image(324, 100, 'boss1');
        this.player_ship = this.add.image(324, 320, 'player_ship');

        //Creación de la variable para la manipulación de las teclas
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;

        //Creación de Cursores enemigo
        this.cursor = this.input.keyboard.createCursorKeys();
        console.log(this.cursor);

        //Asignación de las teclas aliado
        this.teclaA = this.input.keyboard.addKey(keyCodes.A);
        this.teclaW = this.input.keyboard.addKey(keyCodes.W);
        this.teclaS = this.input.keyboard.addKey(keyCodes.S);
        this.teclaD = this.input.keyboard.addKey(keyCodes.D);

        //Creación de combos

        this.combo1 = this.input.keyboard.createCombo(
            [keyCodes.LEFT, keyCodes.RIGHT, keyCodes.UP],
            //Para repetir el combo varias veces
            { resetOnMatch: true }
        );

        this.combo2 = this.input.keyboard.createCombo(
            [keyCodes.A, keyCodes.D, keyCodes.W],
            //Para repetir el combo varias veces
            { resetOnMatch: true }
        );

        this.input.keyboard.on('keycombomatch', (combo1) => {
            this.player_ship.setTint("0xff0000");
        });

        this.input.keyboard.on('keycombomatch', (combo2) => {
            this.boss1.setTint("0x0000ff");
        });

    }

    update(time, delta) {
        //Para mover al personaje enemigo
        if (this.cursor.left.isDown) {
            this.boss1.x--;
        }
        if (this.cursor.right.isDown) {
            this.boss1.x++;
        }
        if (this.cursor.up.isDown) {
            this.boss1.y--;
        }
        if (this.cursor.down.isDown) {
            this.boss1.y++;
        }

        //Controla la transparencia del personaje enemigo
        if (this.cursor.space.isDown) {
            this.boss1.setAlpha(0.5);
        }
        if (this.cursor.space.isUp) {
            this.boss1.setAlpha(1);
        }

        //Para mover al personaje aliado
        if (this.teclaA.isDown) {
            this.player_ship.x--;
        }
        if (this.teclaD.isDown) {
            this.player_ship.x++;
        }
        if (this.teclaW.isDown) {
            this.player_ship.y--;
        }
        if (this.teclaS.isDown) {
            this.player_ship.y++;
        }

        //Controla la transparencia del personaje aliado
        if (this.cursor.shift.isDown) {
            this.player_ship.setAlpha(0.5);
        }
        if (this.cursor.shift.isUp) {
            this.player_ship.setAlpha(1);
        }

        //Distancia Euclidiana

        var radio_b = 64;
        var radio_p = 16;

        //var r2_b=radio_b*2;
        //var r2_p=radio_p*2;

        var distE = Math.sqrt((this.player_ship.x - this.boss1.x) * (this.player_ship.x - this.boss1.x) + (this.player_ship.y - this.boss1.y) * (this.player_ship.y - this.boss1.y));
        if (distE < radio_b || distE < radio_p) {
            this.boss1.y--;
            this.player_ship.y++;
            //console.log('HA OCURRIDO UNA COLISIÓN');
        }
    }
}

export default Bootloader;