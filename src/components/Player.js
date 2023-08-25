import Character from "./Character.js";
import { gameZone } from "../utils/constants.js";

export default class Player extends Character{
    constructor(playerSelector, appearance){
        super(playerSelector, appearance);
        this._container = gameZone;
    }
    
    _jump(evt){
        if (evt.key === "ArrowUp"){
            this._characterElement.classList.add("player_on-jump");
        }
    }

    setJumpAbility(){
        window.addEventListener("keydown", this._jump.bind(this));

        this._characterElement.addEventListener("animationend", ()=>{
            this._characterElement.classList.remove("player_on-jump");
        });
    }
    
    removeJumpAbility(){
        window.removeEventListener("keydown", this._jump);
    }

    generatePlayer(){
        super.generateCharacter(this._container);
    }

}