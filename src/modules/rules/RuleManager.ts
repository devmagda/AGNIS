import {Rule} from './Rule'; // Assuming Rule is in the same directory

class RuleManager<T, U> {
    private _rules: Map<string, Rule<T, U>> = new Map();

    // Add a new rule to the manager
    addRule(rule: Rule<T, U>): void {
        if (this._rules.has(rule.name)) {
            console.error(`Rule with name "${rule.name}" already exists.`);
            return;
        }
        this._rules.set(rule.name, rule);
    }

    // Evaluate all rules for a specific instance of T and U
    evaluateAll(t: T, u: U): void {
        this._rules.forEach(rule => rule.evaluate(t, u));
    }

    // Remove a rule from the manager by its name
    removeRule(ruleName: string): void {
        if (this._rules.has(ruleName)) {
            this._rules.delete(ruleName);
        } else {
            console.error(`Rule with name "${ruleName}" not found.`);
        }
    }

    // Clear all rules from the manager
    clearRules(): void {
        this._rules.clear();
    }

    // Get a rule by its name
    getRule(ruleName: string): Rule<T, U> | undefined {
        return this._rules.get(ruleName);
    }

    // Check if a rule exists by name
    hasRule(ruleName: string): boolean {
        return this._rules.has(ruleName);
    }
}

export {RuleManager};
