import "./imports";
import Controller from "./modules/mvc/Controller";
import { ButtonIds } from "./constants";
import Game from "./Game";
import {View, ViewCanvas} from "./modules/mvc/View";
import Entity from "./entities/Entity";
import VectorUtil from "./modules/math/vectors/VectorUtil";

const game = new Game();
const controller = new Controller(new ViewCanvas(game.canvas));

controller.model.add(new Entity(1 ,VectorUtil.getRandom(VectorUtil.canvasSize()), 10));
controller.model.add(new Entity(2 ,VectorUtil.getRandom(VectorUtil.canvasSize()), 10));
controller.model.add(new Entity(3 ,VectorUtil.getRandom(VectorUtil.canvasSize()), 10));

controller.updateRender();

let isPlaying = false;
let lastFrameTime = 0;

// Game Loop
function gameLoop(timestamp: number) {
    if (!isPlaying) return; // Pause the loop if not playing

    const deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    controller.update(); // Update game state

    requestAnimationFrame(gameLoop);
}

let spawnIdCounter = 42000;

// Button Events
game.buttonPlay.onclick = () => {
    if (!isPlaying) {
        isPlaying = true;
        lastFrameTime = performance.now();
        requestAnimationFrame(gameLoop);
    }
};

game.buttonSpawn.onclick = () => {
    controller.model.add(new Entity(spawnIdCounter++, VectorUtil.getRandom(VectorUtil.canvasSize()), 10));
    controller.updateRender();
}

game.buttonPause.onclick = () => {
    isPlaying = false; // Stops the loop
};

game.buttonNext.onclick = () => controller.update();
game.buttonReload.onclick = () => controller.reload();
