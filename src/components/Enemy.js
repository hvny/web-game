import Character from "./Character.js";

export default class Enemy extends Character{
    static count = 0;   
    constructor(enemySelector, appearance ){
        super(enemySelector, appearance);
        ++Enemy.count;
    }

    generateEnemy(){
        super.generateCharacter();
    }
}