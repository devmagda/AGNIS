import Vector2D from "../math/vectors/Vector2D";
import {Colors} from "../../constants";

class EntityRenderer {
    static drawEntity(ctx: CanvasRenderingContext2D, position: Vector2D, rotation: Vector2D, radius: number) {

        rotation.normalize();

        const lineEnd = new Vector2D(position.x + rotation.x * radius, position.y + rotation.y * radius);

        // Draw the circle (entity)
        ctx.beginPath();
        ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = Colors.bgHighlight;
        ctx.fill();
        ctx.closePath();

        // Draw the direction line
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(lineEnd.x, lineEnd.y);
        ctx.strokeStyle = Colors.danger; // White line
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
}

export { EntityRenderer };