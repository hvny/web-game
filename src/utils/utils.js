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
    if (!popup.classList.contains("popup_visible")) {
        popup.classList.add("popup_visible");
    }
}