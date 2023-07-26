export const templatePlayerSelector = "player";
export const templateEnemySelector = "enemy";

export const page = document.querySelector(".page");
export const gameZone = page.querySelector(".game-zone__main");
export const startButton = gameZone.querySelector(".game-zone__button");
export const enemyContainer = document.querySelector(".game-zone__enemy-container");
export const points = page.querySelector(".game-zone__points");
export const playerImage = "../src/images/dmitry.jpg";
export const enemyImage = "../src/images/max.jpg";

export const music = new Audio("../src/audio/music.mp3");
