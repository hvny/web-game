export const templatePlayerSelector = "player";
export const templateObstacleSelector = "enemy";
export const templateContainerSelector = "enemy__container";

export const page = document.querySelector(".page");
export const gameZone = page.querySelector(".game-zone__main");
export const startButton = gameZone.querySelector(".game-zone__button");
export const points = page.querySelector(".game-zone__points");
export const lifesContainer = page.querySelector(".game-zone__lifes"); 
export const defeatPopup = document.querySelector(".popup_type_defeat");
export const scorePopup = document.querySelector(".popup_type_highscore");
export const scorePoints = scorePopup.querySelector(".popup__points");
export const restartButton = defeatPopup.querySelector(".popup__button");

export const playerImage = "./assets/images/dino.png";
export const enemyImage = "./assets/images/lava.png";
export const music = new Audio("./audio/music.mp3");
