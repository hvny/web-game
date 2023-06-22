import Player from "../components/Player.js";
import Enemy from "../components/Enemy.js";

import {
    templatePlayerSelector,
    templateEnemeySelector,
    startButton,
    points,
    playerImage,
    enemyImage
} from "../utils/constants.js"

let isGame = false;

const characterDmitry = new Player(templatePlayerSelector, playerImage); //создаём персонажа
characterDmitry.generatePlayer();



/*функция, которая прячет кнопку*/
const hideStartButton = () => {     
    startButton.classList.add("game-zone__button_hidden");
}

/*функция, которая плюсует баллы*/
const plusPoints = (counter) => {
    const plus = setInterval(() => {
        let pointsValue = parseInt(points.textContent, 10);
        points.textContent = pointsValue += 10;
        counter += 1;
        if (counter == 100) {
            clearInterval(plus);
        }
    }, 200)
}

const spawnEnemies = () => {
    const enemiesQuantity = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    for (let i = 0; i < enemiesQuantity; i++){
        let enemy = new Enemy(templateEnemeySelector, enemyImage);
        enemy.generateEnemy();
    }
    console.log("count: ",  Enemy.count);
}
startButton.addEventListener("click", () => {
    isGame = true;
    spawnEnemies();
    hideStartButton();
    plusPoints(0);
    characterDmitry.setJumpAbility();
})

