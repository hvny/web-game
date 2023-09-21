import Character from "./Character.js";
export default class Obstacle extends Character{
    constructor(obstacleSelector, appearance){
        super(obstacleSelector, appearance);
    }

    generateEnemy(container) {
        super.generateCharacter(container);
    }
}