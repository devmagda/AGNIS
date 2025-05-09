import "./imports";
import Game from "./game/Game";
import VectorUtil from "./modules/math/vectors/VectorUtil";
import {Monster} from "./entities/Monster";
import {IDGen} from "./modules/math/IdGen";

const game = new Game();

game.controller.model.add(new Monster(VectorUtil.getRandom(VectorUtil.canvasSize())));


game.controller.updateRender();
