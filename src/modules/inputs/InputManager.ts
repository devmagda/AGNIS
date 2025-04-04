import Vector2D from "../math/vectors/Vector2D";
import VectorUtil from "../math/vectors/VectorUtil";

class InputManager {
    private static _instance: InputManager | null = null;

    private _keyDownBinds: Map<string, (event: KeyboardEvent) => void>;
    private _keyUpBinds: Map<string, (event: KeyboardEvent) => void>;
    private _ctrlModifier: boolean = false;
    private _mousePosition: Vector2D = VectorUtil.zero();

    private constructor() {
        this._keyDownBinds = new Map();
        this._keyUpBinds = new Map();

        this.initializeListeners();
        this.setupModifiers();
    }

    static get instance(): InputManager {
        if (!this._instance) {
            this._instance = new InputManager();
        }
        return this._instance;
    }

    get mousePosition(): Vector2D {
        return this._mousePosition;
    }

    get ctrlModifier() {
        return this._ctrlModifier;
    }

    addKeybind(
        char: string,
        keyDownFn: (event: KeyboardEvent) => void,
        keyUpFn: (event: KeyboardEvent) => void = (event) => console.log(`${event.key} key released`)
    ): void {
        this._keyDownBinds.set(char.toLowerCase(), keyDownFn);
        this._keyUpBinds.set(char.toLowerCase(), keyUpFn);
    }

    removeKeybind(char: string): void {
        this._keyDownBinds.delete(char.toLowerCase());
        this._keyUpBinds.delete(char.toLowerCase());
    }

    private initializeListeners() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            console.log("keydown: ", key);
            if (this._keyDownBinds.has(key)) {
                event.preventDefault();
                this._keyDownBinds.get(key)!(event);
            }
        });

        document.addEventListener("keyup", (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            console.log("keyup: ", key);
            if (this._keyUpBinds.has(key)) {
                this._keyUpBinds.get(key)!(event);
            }
        });

        document.addEventListener("mousemove", (event: MouseEvent) => {
            this._mousePosition.x = event.clientX;
            this._mousePosition.y = event.clientY;
        });

        const canvas= document.querySelector("canvas#game_canvas");
        if(canvas) {
            canvas.addEventListener("click", (event: Event) => {console.log("MouseEvent click: ", event)});
            document.addEventListener("contextmenu", (event: Event) => {event.preventDefault(); console.log("MouseEvent contextmenu: ", event)});
        } else {
            console.error("Could not find canvas while trying to setup the InputManager!", this);
            throw new Error("Could not find canvas while trying to setup the InputManager!");
        }
    }

    private setupModifiers() {
        this.addKeybind("control",
            (event: KeyboardEvent) => {
                this._ctrlModifier = true;
                console.log("this._ctrlModifier A", this._ctrlModifier);
            },
            () => {
                this._ctrlModifier = false;
                console.log("this._ctrlModifier B", this._ctrlModifier);
            });
    }
}

export {InputManager};
