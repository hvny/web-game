import Character from "./Character.js";

export default class Player extends Character{
    constructor(playerSelector, appearance){
        super(playerSelector, appearance);
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

    generatePlayer(){
        super.generateCharacter();
    }

}