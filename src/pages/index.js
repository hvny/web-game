import Player from "../components/Player.js";
import Enemy from "../components/Enemy.js";

import {
    templatePlayerSelector,
    templateEnemySelector,
    templateContainerSelector,
    startButton,
    points,
    lifesContainer,
    playerImage,
    enemyImage,
    gameZone,
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

const createEnemyContainer = (container) => {
    return document
    .querySelector(`#${container}`)
    .content.querySelector(`.${container}`)
    .cloneNode(true);
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


/*проверяем, задел ли игрок группу врагов */
const checkLives = (player, enemies) =>{
    setTimeout(function check(){
        if (lifes == 0){
            isGame == false;
            clearTimeout(check);
            characterDmitry.removeJumpAbility();
            console.log("game over");
        }

        const enemyLeft = parseInt(getComputedStyle(enemies).getPropertyValue("left"));
        const playerBottom = parseInt(getComputedStyle(player).getPropertyValue("bottom"));

        if (playerBottom <= 92 && enemyLeft <= 90){ //если игрок задел врага, то вычитаем одну жизнь
            minusLife();
            console.log(lifes);
            clearTimeout(check);                  
        }   
        setTimeout(check, 1000);
    }, 10)
};

const minusLife = () => {
    lifes--;
    const life = lifesContainer.querySelector(".game-zone__life_type_full");
    if (life){
        life.classList.remove("game-zone__life_type_full");
        life.classList.add("game-zone__life_type_empty");
    }
};


/*спавн одной группы врагов; в группе от 1 до 3 enemy*/
const spawnGroupOfEnemies = () => {
    const enemyContainer = createEnemyContainer(templateContainerSelector);
    const enemiesQuantity = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    enemyContainer.addEventListener("animationend", ()=>{ /*когда враги уходят за пределы видимой зоны, они удаляются*/
        gameZone.removeChild(enemyContainer);
    })

    gameZone.append(enemyContainer);
    for (let i = 0; i < enemiesQuantity; i++){
        let enemy = new Enemy(templateEnemySelector, enemyImage);
        enemy.generateEnemy(enemyContainer);
    }

    return { enemyContainer };
};

/* каждые 2000мс спавним группу врагов, и вместе с тем вызываем checkLives()*/
const spawnEnemies = () => {
    setTimeout(function spawn() {
        if (!isGame) {
            clearTimeout(spawn)
        }
        spawnGroupOfEnemies();
        checkLives(playerElem, spawnGroupOfEnemies().enemyContainer);
        setTimeout(spawn, 2000);
    }, 2000);
    
};

startButton.addEventListener("click", () => {
    isGame = true;
    music.play();
    hideStartButton();
    spawnEnemies();
    plusPoints();
    characterDmitry.setJumpAbility();
});

