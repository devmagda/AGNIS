import {Idable} from "../../math/IdGen";

interface Action extends Idable {
    checkPreconditions(): boolean;

    execute(): void;

    getCost(): number;

    equals(action: Action): boolean;
}

export { Action };