import Player from "../components/Player.js";
import Enemy from "../components/Enemy.js";

import {
    templatePlayerSelector,
    templateEnemySelector,
    gameZone,
    startButton,
    enemyContainer,
    points,
    playerImage,
    enemyImage,
    music
} from "../utils/constants.js"


let isGame = false;
let lifes = 4;

const characterDmitry = new Player(templatePlayerSelector, playerImage); //создаём персонажа
characterDmitry.generatePlayer();
const playerElem = gameZone.querySelector(".player");


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
    const enemiesQuantity = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    for (let i = 0; i < enemiesQuantity; i++){
        let enemy = new Enemy(templateEnemySelector, enemyImage);
        enemy.generateEnemy(enemyContainer);
    }

    enemyContainer.addEventListener("animationend", ()=>{ /*когда враги уходят за пределы видимой зоны, они удаляются*/
        
    })
    
    
    


};

const checkAlive = (player, enemy) => {
    let playerBottom = parseInt(getComputedStyle(player).bottom);
    let enemyLeft = parseInt(getComputedStyle(enemy).left);
    //console.log(`player: ${playerBottom}\nenemy: ${enemyLeft}`);
    console.log(`player: ${playerBottom}\nenemy: ${enemyLeft}`);
    if (enemyLeft <= 90 && enemyLeft > 20 && playerBottom <= 50){
        lifes--;
        console.log('lifes: ', lifes);
    }
};

const spawnEnemies = () => {
    /*
    const spawn = setInterval(() => {
        spawnGroupOfEnemies();
        
        if (!isGame) {
            clearInterval(spawn)
        }
    }, 1200);*/

    spawnGroupOfEnemies();
};

startButton.addEventListener("click", () => {
    isGame = true;
    music.play();
    hideStartButton();
    spawnEnemies();
    plusPoints();
    characterDmitry.setJumpAbility();
});

