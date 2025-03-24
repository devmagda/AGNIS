import {Model, ModelEntity} from "./Model";

export default class View {
    update(model: Model): void {
        model.data.forEach((entity: ModelEntity) => {
            console.log(`Entity at position: (${entity._position.x}, ${entity._position.y})`);
        });
    }
}