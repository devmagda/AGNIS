import Entity from "../../entities/Entity";

export default interface Behaviour {
    apply(entity: Entity): void;
}