import Character from "./Character.js";

export default class Player extends Character{
    constructor(playerSelector, appearance){
        super(playerSelector, appearance);
    }

    setJumpAbility(){
        window.addEventListener("keydown", (evt)=>{
            if (evt.key === "ArrowUp"){
                this._characterElement.classList.add("player_on-jump");
            }
        });
        
        this._characterElement.addEventListener("animationend", ()=>{
            this._characterElement.classList.remove("player_on-jump");
        });
    }

    generatePlayer(){
        super.generateCharacter();
    }

}