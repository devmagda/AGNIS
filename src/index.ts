import "./imports";
import Game from "./Game";
import Entity from "./entities/Entity";
import VectorUtil from "./modules/math/vectors/VectorUtil";
import {Monster} from "./entities/Monster";
import {IDGen} from "./modules/math/IdGen";

const game = new Game();

game.controller.model.add(new Monster(IDGen.getId("monster") ,VectorUtil.getRandom(VectorUtil.canvasSize())));
game.controller.model.add(new Monster(IDGen.getId("monster") ,VectorUtil.getRandom(VectorUtil.canvasSize())));
game.controller.model.add(new Monster(IDGen.getId("monster") ,VectorUtil.getRandom(VectorUtil.canvasSize())));

game.controller.updateRender();
