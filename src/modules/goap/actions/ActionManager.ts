import { BaseAction } from "./BaseAction";
import {Action} from "./Action";

class ActionManager {
    private actions: Set<Action> = new Set();

    // Adds an action to the set
    addAction(action: Action): void {
        if (!this.hasAction(action.id)) {
            this.actions.add(action);
        }
    }

    // Removes an action by its ID
    removeAction(id: string): void {
        const action = this.getAction(id);
        if (action) {
            this.actions.delete(action);
        }
    }

    // Gets an action by its ID
    getAction(id: string): BaseAction | undefined {
        return Array.from(this.actions).find(action => action.id === id);
    }

    // Checks if an action with the given ID exists
    hasAction(id: string): boolean {
        return !!this.getAction(id);
    }

    // Clears all actions from the set
    clearActions(): void {
        this.actions.clear();
    }

    // Optionally, return all actions as an array
    getAllActions(): Action[] {
        return Array.from(this.actions);
    }
}

export { ActionManager };
