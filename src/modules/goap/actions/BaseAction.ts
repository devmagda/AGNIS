import {Action} from "./Action";

abstract class BaseAction implements Action {
    id: string;

    protected constructor(id: string) {
        this.id = id;
    }

    abstract checkPreconditions(): boolean;

    abstract execute(): void;

    abstract getCost(): number;

    equals(action: Action): boolean {
        return this.id === action.id;
    }
}

export { BaseAction };