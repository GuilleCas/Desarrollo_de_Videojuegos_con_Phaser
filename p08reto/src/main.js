import inicio from "./scenes/inicio.js"
import Bootloader from './scenes/Bootloader.js';
import credits from './scenes/credits.js';
import options from './scenes/options.js';

const config = {
  title: "Curso Phaser",
  url: "http://google.es",
  version: "0.0.1",
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: "phaser_container",
  pixelArt: true,
  backgroundColor: "#34495e",
  scene: [inicio, Bootloader, credits, options],
  banner: {
    hidePhaser: true,
    text: "#fff00f",
    background: [
      "#16a085",
      "#2ecc71",
      "#e74c3c",
      "#000000"]
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 800
      },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);