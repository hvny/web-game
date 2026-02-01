import Player from "../components/Player.js";
import Obstacle from "../components/Obstacle.js";

import {
    templatePlayerSelector,
    templateObstacleSelector,
    templateContainerSelector,
    startButton,
    points,
    lifesContainer,
    defeatPopup,
    scorePopup,
    scorePoints,
    restartButton,
    playerImage,
    enemyImage,
    gameZone,
} from "../utils/constants.js";

import {
    hideButton,
    createContainer,
    deleteElems,
    openPopup,
    changeCursorStyle,
    showScore,
    updateScore,
} from "../utils/utils.js";

import {
    setItem, 
} from "../utils/storage.js";

let isGame = false;
let lifes = 4;

//localStorage.clear();

const mainCharacter = new Player(templatePlayerSelector, playerImage); //создаём персонажа
mainCharacter.generatePlayer();

const playerElem = gameZone.querySelector(".player");

showScore("score", scorePopup, scorePoints);  //если пользователь уже играл, то покажется попап с рекордом

/*функция, которая плюсует баллы*/
const plusPoints = () => {
    const plus = setInterval(() => {
        if (!isGame) {
            clearInterval(plus);
            return;
        }
        let pointsValue = parseInt(points.textContent, 10);
        points.textContent = pointsValue += 10;
    }, 200)
};

/*вычитаем жизнь*/
const minusLife = () => {
    lifes--;
    const life = lifesContainer.querySelector(".game-zone__life_type_full");
    if (life){
        life.classList.remove("game-zone__life_type_full");
        life.classList.add("game-zone__life_type_empty");
    }
};

/*функция, вызываемая при поражении */
const defeat = () => {
    isGame = false;
    setItem("score", points.textContent);       //добавляем рекорд в localStorage при первом поражении
    updateScore();                              //обновляем рекорд на странице и в localStorage
    changeCursorStyle(gameZone, isGame);        //появляется курсор
    deleteElems(templateContainerSelector);     //удаляются препятствия
    openPopup(defeatPopup);                     //открывается попап
}

/*проверяем, задел ли игрок группу врагов */
const checkLives = (player, obstacles) =>{
    setTimeout(function check(){
        if (isGame == false) {
            clearTimeout(check);
            return;
        }
        const obstacleLeft = parseInt(getComputedStyle(obstacles).getPropertyValue("left"));
        const playerBottom = parseInt(getComputedStyle(player).getPropertyValue("bottom"));

        if (lifes == 0){
            clearTimeout(check);
            defeat();
            return;
        }

        if (playerBottom <= 92 && obstacleLeft <= 90 && obstacleLeft >= -20){ //если игрок задел препятствие, то вычитаем одну жизнь
            clearTimeout(check); 
            minusLife();   
            return;              
        }
        setTimeout(check, 100);
    }, 100)
};

/*спавн одной группы препятствий; в группе от 1 до 3 enemy*/
const spawnGroupOfObstacles = () => {
    if (isGame === false){
        return;
    }
    const obstacleContainer = createContainer(templateContainerSelector);
    const obstaclesQuantity = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    obstacleContainer.addEventListener("animationend", ()=>{ /*когда препятствия уходят за пределы видимой зоны, они удаляются*/
        obstacleContainer.remove();
    })

    gameZone.append(obstacleContainer);
    for (let i = 0; i < obstaclesQuantity; i++){
        let obstacle = new Obstacle(templateObstacleSelector, enemyImage);
        obstacle.generateEnemy(obstacleContainer);
    }
    return { obstacleContainer };
};

/* каждые 1000мс спавним группу препятствий, и вместе с тем вызываем checkLives()*/
const spawnObstacles = () => {
    setTimeout(function spawn() {
        if (isGame === false) {
            clearTimeout(spawn);
            return;
        }
        spawnGroupOfObstacles();
        checkLives(playerElem, spawnGroupOfObstacles().obstacleContainer);
        setTimeout(spawn, 1000);
    }, 1000);  
};

/*начинаем игру*/
startButton.addEventListener("click", () => {
    hideButton(startButton);
    isGame = true;
    changeCursorStyle(gameZone, isGame);
    mainCharacter.setJumpAbility();
    spawnObstacles();
    plusPoints();
});

restartButton.addEventListener("click", () => {
    location.reload();
});