import {Stat} from "../stats/Stat";
import {Rule} from "./Rule";

class RuleBuilder<T, U> {
    private conditions: ((t: T) => boolean)[] = [];
    private typeCondition: (t: T) => boolean = () => true; // Default to always true (no type check)
    private onActivateCallback: (t: U) => void = () => {};
    private onDeactivateCallback: (t: U) => void = () => {};
    private ruleName: string;

    constructor(ruleName: string) {
        this.ruleName = ruleName;
    }

    // Add a condition function that returns a boolean based on the stat
    addCondition(condition: (t: T) => boolean): RuleBuilder<T, U> {
        this.conditions.push(condition);
        return this;
    }

    // Add a type condition (checks type of stat)
    addTypeCondition(typeCheck: (t: T) => boolean): RuleBuilder<T, U> {
        this.typeCondition = typeCheck;
        return this;
    }

    // Set the onActivate action to be executed when the rule is activated
    onActivate(callback: (u: U) => void): RuleBuilder<T, U> {
        this.onActivateCallback = callback;
        return this;
    }

    // Set the onDeactivate action to be executed when the rule is deactivated
    onDeactivate(callback: (u: U) => void): RuleBuilder<T, U> {
        this.onDeactivateCallback = callback;
        return this;
    }

    // Build the rule and return it as a Rule<Stat> object
    build(): Rule<T, U> {
        return new Rule<T, U>(
            this.ruleName,
            this.conditions,
            this.typeCondition,
            this.onActivateCallback,
            this.onDeactivateCallback
        );
    }
}

export {RuleBuilder};