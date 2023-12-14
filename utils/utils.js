import {
    checkStorage,
    updateItem,
} from "./storage.js";

import {
    points,
    scorePoints,
} from "./constants.js";

/*функция, которая прячет кнопку*/
export const hideButton = (button) => {     
    button.classList.add("game-zone__button_hidden");
};

/*возвращаем dom-элемент из темплэйта */
export const createContainer = (container) => {
    return document
    .querySelector(`#${container}`)
    .content.querySelector(`.${container}`)
    .cloneNode(true);
};

/*удаление dom-элементов*/
export const deleteElems = (selector) => {
    document.querySelectorAll(`.${selector}`).forEach(elem => {
        elem.remove();
    });
}

export const openPopup = (popup) => {
    !popup.classList.contains("popup_opened") ? popup.classList.add("popup_opened") : " ";
}

export const changeCursorStyle = (container, isGame) => {
    isGame ? container.style.cursor = "none" : container.style.cursor = "default";
}

export const showScore = (item, popup, score) => {
    if (checkStorage(item)) {
        score.textContent = localStorage.getItem(item);
        openPopup(popup);
    }
}

export const updateScore = () => {
    if (parseInt(scorePoints.textContent) < parseInt(points.textContent)){
        scorePoints.textContent = points.textContent;
        updateItem("score", points.textContent);
    }
}
