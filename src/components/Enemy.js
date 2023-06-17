import Character from "./Character.js";

export default class Enemy extends Character{
    constructor(enemySelector, appearance ){
        super(enemySelector, appearance);
    }

    generateEnemy(){
        super.generateCharacter();
    }
}