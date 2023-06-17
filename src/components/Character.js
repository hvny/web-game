import { gameZone } from "../utils/constants.js";
export default class Character{
    constructor(characterSelector, appearance){
        this._characterSelector = characterSelector;
        this._container = gameZone;
        this._appearance = appearance;
    }

    _getCharacterElement(){
        return document
        .querySelector(this._characterSelector)
        .content.querySelector(".character")
        .cloneNode(true);
    }

    generateCharacter(){
        this._characterElement = this._getCharacterElement();
        this._characterElement.style.backgroundImage = `url(${this._appearance})`;
        this._container.prepend(this._characterElement);
    }
}   