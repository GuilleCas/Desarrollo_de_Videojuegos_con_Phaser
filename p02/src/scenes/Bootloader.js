class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: "Bootloader" //Nombre interno o clave de referencia
        });
    }
    init() {
        console.log("Soy init");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('background', './fondo-mario.jpg');
        this.load.image('goomba', './goomba.gif');

        this.load.image(["ladrillos", "moneda", "block", "mario"]); //Arreglo de imágenes
    }
    create() {
        this.background = this.add.image(280, 160, 'background');

        this.goomba = this.add.image(360, 292, "goomba");
        this.mario = this.add.image(25, 282, "mario");

        this.ladrillo1 = this.add.image(304, 200, "ladrillos");
        this.ladrillo2 = this.add.image(353, 200, "ladrillos");
        this.ladrillo3 = this.add.image(255, 200, "ladrillos");

        //Creación de bloques de piso
        this.block1 = this.add.image(25, 336, "block");
        this.block2 = this.add.image(73, 336, "block");
        this.block3 = this.add.image(121, 336, "block");
        this.block4 = this.add.image(169, 336, "block");
        this.block5 = this.add.image(217, 336, "block");
        this.block6 = this.add.image(265, 336, "block");
        this.block7 = this.add.image(313, 336, "block");
        this.block8 = this.add.image(361, 336, "block");
        this.block9 = this.add.image(409, 336, "block");
        this.block10 = this.add.image(457, 336, "block");
        this.block11 = this.add.image(505, 336, "block");
        this.block12 = this.add.image(553, 336, "block");
        this.block13 = this.add.image(601, 336, "block");
        this.moneda = this.add.image(300, 160, "moneda");

        //Modificación de tamaño
        this.block1.setScale(0.04, 0.04);
        this.block2.setScale(0.04, 0.04);
        this.block3.setScale(0.04, 0.04);
        this.block4.setScale(0.04, 0.04);
        this.block5.setScale(0.04, 0.04);
        this.block6.setScale(0.04, 0.04);
        this.block7.setScale(0.04, 0.04);
        this.block8.setScale(0.04, 0.04);
        this.block9.setScale(0.04, 0.04);
        this.block10.setScale(0.04, 0.04);
        this.block11.setScale(0.04, 0.04);
        this.block12.setScale(0.04, 0.04);
        this.block13.setScale(0.04, 0.04);

        this.ladrillo1.setScale(0.013, 0.013);
        this.ladrillo2.setScale(0.013, 0.013);
        this.ladrillo3.setScale(0.013, 0.013);
        this.moneda.setScale(0.1, 0.1);

        this.mario.setScale(0.23, 0.23);
        this.goomba.setScale(0.16, 0.16);

        this.inc = 1;
    }
    update(time, delta) {
        this.goomba.x += this.inc;

        if (this.goomba.x >= 525 || this.goomba.x <= 200) {
            this.inc *= (-1);

            if (this.goomba.x >= 600) {
                this.moneda.setTint("FFFF00");
                this.goomba.setFlipX(true);
            }
            else {
                this.moneda.setTint("FFFF00");
                this.goomba.setFlipX(false);
            }
        }
    }
}
export default Bootloader;