import "./imports";
import Game from "./Game";
import Entity from "./entities/Entity";
import VectorUtil from "./modules/math/vectors/VectorUtil";

const game = new Game();

game.controller.model.add(new Entity(++game.lastId ,VectorUtil.getRandom(VectorUtil.canvasSize())));
game.controller.model.add(new Entity(++game.lastId ,VectorUtil.getRandom(VectorUtil.canvasSize())));
game.controller.model.add(new Entity(++game.lastId ,VectorUtil.getRandom(VectorUtil.canvasSize())));

game.controller.updateRender();
