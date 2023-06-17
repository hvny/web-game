import Player from "../components/Player.js";
import Enemy from "../components/Enemy.js";

import {
    startButton,
    points,
    characterImage,
    templateCharacterSelector
} from "../utils/constants.js"

let isGame = false;

const characterDmitry = new Player(templateCharacterSelector, characterImage); //создаём персонажа
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

startButton.addEventListener("click", () => {
    isGame = true;
    hideStartButton();
    plusPoints(0);
    characterDmitry.setJumpAbility();
})