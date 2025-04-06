class Rule<T, U> {
    private conditions: ((t: T) => boolean)[];
    private typeCondition: (t: T) => boolean; // Type check condition
    private onActivateCallback: (t: U) => void;
    private onDeactivateCallback: (t: U) => void;

    constructor(
        ruleName: string,
        conditions: ((t: T) => boolean)[],
        typeCondition: (t: T) => boolean, // Use type check condition
        onActivateCallback: (u: U) => void,
        onDeactivateCallback: (u: U) => void
    ) {
        this._name = ruleName;
        this.conditions = conditions;
        this.typeCondition = typeCondition;
        this.onActivateCallback = onActivateCallback;
        this.onDeactivateCallback = onDeactivateCallback;
    }

    private _name: string;

    get name() {
        return this._name;
    }

    // Evaluate the rule based on conditions and type condition
    evaluate(t: T, u: U): void {
        if (this.typeCondition(t)) {
            const satisfiesConditions = this.conditions.every(condition => condition(t));

            if (satisfiesConditions) {
                this.onActivateCallback(u); // Activate with all stats for cross-stat actions
            } else {
                this.onDeactivateCallback(u); // Deactivate the rule otherwise
            }
        }
    }
}

export {Rule};