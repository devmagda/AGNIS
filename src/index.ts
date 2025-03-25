import "./imports";
import { Vector2D } from "./modules/math/vectors/Vectors";
import Controller from "./modules/mvc/Controller";
import { ButtonIds } from "./constants";
import Game from "./Game";

const game = new Game();
const controller = Controller.defaultConfig(game.canvas);

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

// Button Events
game.buttonPlay.onclick = () => {
    if (!isPlaying) {
        isPlaying = true;
        lastFrameTime = performance.now();
        requestAnimationFrame(gameLoop);
    }
};

game.buttonPause.onclick = () => {
    isPlaying = false; // Stops the loop
};

game.buttonNext.onclick = () => controller.update();
game.buttonReload.onclick = () => controller.reload();
