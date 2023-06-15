export default class Character{
    constructor(characterSelector, container, appearance){
        this._characterSelector = characterSelector;
        this._container = container;
        this._appearance = appearance;
        this._characterElement = document
        .querySelector(this._characterSelector)
        .content.querySelector(".character")
        .cloneNode(true);
    }

    setJumpAbility(){
        window.addEventListener("keydown", (evt)=>{
            if (evt.key === "ArrowUp"){
                this._characterElement.classList.add("game-zone__character_on-jump");
            }
        });
        
        this._characterElement.addEventListener("animationend", ()=>{
            this._characterElement.classList.remove("game-zone__character_on-jump");
        });
    }

    generateCharacter(){
        this._characterElement.style.backgroundImage = `url(${this._appearance})`;
        this._container.prepend(this._characterElement);
    }
}   