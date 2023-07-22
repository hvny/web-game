export default class Character{
    constructor(characterSelector, appearance){
        this._characterSelector = characterSelector;
        this._appearance = appearance;
    }

    _getCharacterElement(){
        return document
        .querySelector(`#${this._characterSelector}`)
        .content.querySelector(`.${this._characterSelector}`)
        .cloneNode(true);
    }

    generateCharacter(container){
        this._characterElement = this._getCharacterElement();
        this._characterElement.style.backgroundImage = `url(${this._appearance})`;
        container.append(this._characterElement);
    }
}   