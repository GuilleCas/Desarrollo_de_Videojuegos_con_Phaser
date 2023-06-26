class episode1 extends Phaser.Scene {
  constructor() {
    super({
      key: 'episode1'
    });
  }

  init() {
    console.log('Escena episode1');
  }

  preload() {
    this.load.path = '../assets/Episode/';
    // Imagenes
    this.load.image('background-episode', 'img/background-episode.png');
    this.load.image('ghost', 'img/ghost.png');

    // Animación de los personajes
    this.load.atlas('skeleton', 'skeleton_atlas/skeleton.png', 'skeleton_atlas/skeleton_atlas.json');
    this.load.animation('skeletonAnim', 'skeleton_atlas/skeleton_anim.json');

    this.load.atlas('zombie', 'zombie_atlas/zombie.png', 'zombie_atlas/zombie_atlas.json');
    this.load.animation('zombieAnim', 'zombie_atlas/zombie_anim.json');
  }

  create() {

    // Escalas de la pantalla
    this.w = this.scale.width;
    this.h = this.scale.height;

    // Creación del fondo
    this.background = this.add.image(0, 0, 'background-episode').setOrigin(0, 0).setDepth(0);
    this.background.displayWidth = window.innerWidth;
    this.background.displayHeight = window.innerHeight;
    this.background.setAlpha(1);

    // Colocando los sprites de los personajes
    this.ghost = this.add.image(950, 500, 'ghost').setScale(0.4);

    this.skeleton = this.add.sprite(950, 240, 'skeleton').setScale(4);

    this.skeleton2 = this.add.sprite(200, 240, 'skeleton').setScale(4);
    this.skeleton2.anims.play('skeleton_idle');

    // Creando animaciones para los personajes
    this.ghost_move = this.add.tween({
      targets: [this.ghost],
      alpha: 0.5,
      ease: 'Power1',
      rotation: Math.PI,
      repeat: 1,
      y: 600,
      x: {
        value: 400,
        ease: 'Cubic',
        duration: 3000
      },
      y: 200,
      x: {
        value: 400,
        ease: 'elastic',
        duration: 3000

      },
      onYoyo: () => {
        this.ghost.setScale(0.2);
      },
      onComplete: () => {
        this.ghost.setTint(0xa5a58d);
      },
      yoyo: true,
    });

    this.skeleton_left = this.add.tween({
      targets: [this.skeleton],
      x: {
        value: 800,
        duration: 3000
      },
      onStart: () => {
        this.skeleton.anims.play('skeleton_walkl');
      },
      onComplete: () => {
        this.skeleton.anims.play('skeleton_idle');
        this.skeleton.setTint(0xdc39e3);
      }
    });

  }

  update(time, delta) {

  }
}

export default episode1;