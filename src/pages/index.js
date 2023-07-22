import Player from "../components/Player.js";
import Enemy from "../components/Enemy.js";

import {
    templatePlayerSelector,
    templateEnemySelector,
    templateContainerSelector,
    startButton,
    points,
    playerImage,
    enemyImage,
    gameZone,
    music
} from "../utils/constants.js"

let isGame = false;

const characterDmitry = new Player(templatePlayerSelector, playerImage); //создаём персонажа
characterDmitry.generatePlayer();

const playerElem = gameZone.querySelector(".player");
const playerRect = playerElem.getBoundingClientRect();


console.log(playerRect.x);

/*функция, которая прячет кнопку*/
const hideStartButton = () => {     
    startButton.classList.add("game-zone__button_hidden");
}

/*функция, которая плюсует баллы*/
const plusPoints = () => {
    const plus = setInterval(() => {
        let pointsValue = parseInt(points.textContent, 10);
        points.textContent = pointsValue += 10;
        if (!isGame) {
            clearInterval(plus);
        }
    }, 200)
}

const createEnemyContainer = (container) => {
    return document
    .querySelector(`#${container}`)
    .content.querySelector(`.${container}`)
    .cloneNode(true);
}

/*спавн одной группы врагов*/
const spawnGroupOfEnemies = () => {
    const enemiesQuantity = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    const enemyContainer = createEnemyContainer(templateContainerSelector);
    gameZone.append(enemyContainer);

    for (let i = 0; i < enemiesQuantity; i++){
        let enemy = new Enemy(templateEnemySelector, enemyImage);
        enemy.generateEnemy(enemyContainer);
    }

    enemyContainer.addEventListener("animationend", ()=>{ /*когда враги уходят за пределы видимой зоны, они удаляются*/
        gameZone.removeChild(enemyContainer);
    })
}

const spawnEnemies = () => {
    const spawn = setInterval(() => {
        spawnGroupOfEnemies();
        if (!isGame) {
            clearInterval(spawn)
        }
    }, 1200);
}

startButton.addEventListener("click", () => {
    isGame = true;
    music.play();
    hideStartButton();
    spawnEnemies();
    plusPoints();
    characterDmitry.setJumpAbility();
})

