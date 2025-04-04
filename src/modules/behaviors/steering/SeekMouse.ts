import Behaviour from "../Behaviour";
import Entity from "../../../entities/Entity";
import SeekTarget from "./SeekTarget";
import {InputManager} from "../../inputs/InputManager";

class SeekMouse extends SeekTarget implements Behaviour {

    constructor() {
        super(InputManager.instance.mousePosition);
    }

    apply(entity: Entity): void {
        this._target = InputManager.instance.mousePosition;
        super.apply(entity);
    }
}

export {SeekMouse};
