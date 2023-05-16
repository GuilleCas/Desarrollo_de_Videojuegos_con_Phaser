class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: "Bootloader" // Nombre interno o clave de referencia
        });
    }
    init() {
        console.log("Soy init");
    }
    preload() {

        this.load.path = "./assets/";
        this.load.image(["yoshi_fondo", "yoshi"]); // Arreglo de imágenes
    }
    create() {
        this.yoshi = this.add.image(110, 250, "yoshi"); //atributo
        this.yoshif = this.add.image(100, 250, "yoshi_fondo");//atributo

        this.yoshi.setDepth(1); // Agrega al Yoshi adelante del yoshif

        /*
            Prueba de algunas propiedades
        
            this.yoshi.flipY = true; 
            this.yoshi.flipX = true;
            this.yoshi.setVisible(false);
            this.yoshif.setScale(1.5,1.5);
            this.yoshif.setTint(0xffff00)
        */

        this.inc = 1.5;
    }
    update(time, delta) {
        this.yoshi.x += this.inc;

        if (this.yoshi.x >= 600 || this.yoshi.x <= 20) {
            this.inc *= (-1);


            if (this.yoshi.x >= 600) {
                this.yoshi.setFlipX(true);
            }
            else {
                this.yoshi.setFlipX(false);
            }

            this.yo
        }
    }
}
export default Bootloader;