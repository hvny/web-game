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
    console.log("checked!");
    const enemyElem = enemies;
    const check = setInterval(()=>{             //каждые 150мс чекаем положение игрока и группы врагов 
        const enemyLeft = parseInt(getComputedStyle(enemyElem).getPropertyValue("left"));
        const playerBottom = parseInt(getComputedStyle(player).getPropertyValue("bottom"));

        if (playerBottom <= 92 && enemyLeft <= 90){ //если игрок задел врага, то вычитаем одну жизнь,
            lifes--                                 //и сбрасываем интервал, чтобы не происходило ;         
            clearInterval(check);                   //многократное вычитаниие сердец, ведь функция выполняется каждые 150мс,
            console.log(lifes);
        }                                           //и это может происходить (многократное вычитание)
    }, 20)
}


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

/* каждые 1900мс спавним группу врагов, и вместе с тем вызываем checkLives()*/
const spawnEnemies = () => {
    const spawn = setInterval(() => {
        spawnGroupOfEnemies();
        checkLives(playerElem, spawnGroupOfEnemies().enemyContainer);
        if (!isGame) {
            clearInterval(spawn)
        }
    }, 1900);
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

