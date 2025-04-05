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

    static drawFood(ctx: CanvasRenderingContext2D, position: Vector2D, radius: number) {
        const halfSize = radius;

        // Glow effect using radial gradient
        const gradient = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, radius * 2);
        gradient.addColorStop(0, "rgba(255,170,0,0.6)");
        gradient.addColorStop(1, "rgba(255, 255, 0, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(position.x, position.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        // Draw centered yellow square
        ctx.beginPath();
        ctx.fillStyle = "#ffff00"; // bright yellow
        ctx.fillRect(position.x - halfSize, position.y - halfSize, halfSize * 2, halfSize * 2);
        ctx.closePath();
    }
}

export { EntityRenderer };