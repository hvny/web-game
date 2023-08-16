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
    restartButton,
    playerImage,
    enemyImage,
    gameZone,
    music,
} from "../utils/constants.js";

import {
    hideButton,
    createContainer,
    deleteElems,
    openPopup,
} from "../utils/utils.js";

let isGame = false;
let lifes = 4;

const mainCharacter = new Player(templatePlayerSelector, playerImage); //создаём персонажа
mainCharacter.generatePlayer();

const playerElem = gameZone.querySelector(".player");


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

/*проверяем, задел ли игрок группу врагов */
const checkLives = (player, obstacles) =>{
    if (isGame === false){
        return;
    }

    setTimeout(function check(){
        const obstacleLeft = parseInt(getComputedStyle(obstacles).getPropertyValue("left"));
        const playerBottom = parseInt(getComputedStyle(player).getPropertyValue("bottom"));

        if (lifes == 0){
            isGame = false;
            deleteElems(templateContainerSelector);
            clearTimeout(check);
            openPopup(defeatPopup);
            return;
        }
        console.log(obstacleLeft);
        if (playerBottom <= 92 && obstacleLeft <= 90 && obstacleLeft >= 20){ //если игрок задел врага, то вычитаем одну жизнь
            minusLife();
            console.log(lifes);
            clearTimeout(check);    
            return;              
        }
        
        setTimeout(check, 100);
    }, 100)
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

/*спавн одной группы препятствий; в группе от 1 до 3 enemy*/
const spawnGroupOfObstacles = () => {
    if (isGame === false){
        console.log("isGame:", isGame);
        return;
    }
    const obstacleContainer = createContainer(templateContainerSelector);
    const obstaclesQuantity = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    obstacleContainer.addEventListener("animationend", ()=>{ /*когда враги уходят за пределы видимой зоны, они удаляются*/
        obstacleContainer.remove();
    })

    gameZone.append(obstacleContainer);
    for (let i = 0; i < obstaclesQuantity; i++){
        let obstacle = new Obstacle(templateObstacleSelector, enemyImage);
        obstacle.generateEnemy(obstacleContainer);
    }

    return { obstacleContainer };
};

/* каждые 2000мс спавним группу врагов, и вместе с тем вызываем checkLives()*/
const spawnObstacles = () => {
    setTimeout(function spawn() {
        if (isGame === false) {
            clearTimeout(spawn);
            return;
        }
        spawnGroupOfObstacles();
        checkLives(playerElem, spawnGroupOfObstacles().obstacleContainer);
        setTimeout(spawn, 2000);
    }, 2000);
    
};

startButton.addEventListener("click", () => {
    isGame = true;
    //music.play();
    hideButton(startButton);
    spawnObstacles();
    plusPoints();
    mainCharacter.setJumpAbility();
});

restartButton.addEventListener("click", () => {
    location.reload();
});