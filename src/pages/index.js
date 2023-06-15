import Character from "../components/Character.js";
import Enemy from "../components/Enemy.js";

import {
    gameZone,
    startButton,
    points,
    characterImage,
    templateCharacterSelector
} from "../utils/constants.js"

let isGame = false;

const characterDmitry = new Character(templateCharacterSelector, gameZone, characterImage); //создаём персонажа
characterDmitry.generateCharacter();

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

/* 
const setEventListeners = () => {
    window.addEventListener("keydown", (evt)=>{
        if (evt.key === "ArrowUp"){
            characterDmitry.classList.add("game-zone__character_on-jump");
        }
    });
    
    characterDmitry.addEventListener("animationend", ()=>{
        characterDmitry.classList.remove("game-zone__character_on-jump");
    });
} 
*/










/*
window.addEventListener("keydown", (evt) => {
    if (evt.key == "ArrowUp") {
        character.style.bottom = "80px";
    }
})

window.addEventListener("keyup", (evt) => {
    if (evt.key == "ArrowUp") {
        character.style.bottom = "40px";
    }
})*/