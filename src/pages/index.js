import Player from "../components/Player.js";
import Enemy from "../components/Enemy.js";

import {
    templatePlayerSelector,
    templateEnemySelector,
    templateContainerSelector,
    startButton,
    enemyContainer,
    points,
    playerImage,
    enemyImage,
    gameZone,
    music
} from "../utils/constants.js"

import { removeAllChilds } from "../utils/utils.js";

let isGame = false;
let lifes = 4;

const characterDmitry = new Player(templatePlayerSelector, playerImage); //создаём персонажа
characterDmitry.generatePlayer();

const playerElem = gameZone.querySelector(".player");

const playerRect = playerElem.getBoundingClientRect();

/*функция, которая прячет кнопку*/
const hideStartButton = () => {     
    startButton.classList.add("game-zone__button_hidden");
};



/*функция, которая плюсует баллы*/
const plusPoints = () => {
    const plus = setInterval(() => {
        let pointsValue = parseInt(points.textContent, 10);
        points.textContent = pointsValue += 10;
        if (!isGame) {
            clearInterval(plus);
        }
    }, 200)
};

const spawnGroupOfEnemies = () => {
    removeAllChilds(enemyContainer);
    const enemiesQuantity = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    for (let i = 0; i < enemiesQuantity; i++){
        let enemy = new Enemy(templateEnemySelector, enemyImage);
        enemy.generateEnemy(enemyContainer);
    }

};

/*
const minusLife = (playerRect, enemiesRect) => {
    console.log(lifes);
    if (enemiesRect.x <= 219 && playerRect.top < 528){
        lifes--;
    }
};*/

const spawnEnemies = () => {
    const spawn = setInterval(() => {
        spawnGroupOfEnemies();
        if (!isGame) {
            clearInterval(spawn)
        }
    }, 3000);
};

startButton.addEventListener("click", () => {
    isGame = true;
    music.play();
    hideStartButton();
    spawnGroupOfEnemies();
    spawnEnemies();
    plusPoints();
    characterDmitry.setJumpAbility();
});

