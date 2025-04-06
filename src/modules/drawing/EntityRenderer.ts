import Vector2D from "../math/vectors/Vector2D";
import {Colors} from "../../constants";
import {StatsComponent} from "../../entities/components/StatsComponent";
import {HealthStat, HungerStat} from "../stats/StatLib";

class EntityRenderer {
    static drawEntity(ctx: CanvasRenderingContext2D, position: Vector2D, rotation: Vector2D, radius: number, statsComponent: StatsComponent) {
        const statManager = statsComponent.statsManager;

        const minimalRadius = 10;

        const healthStat = statManager.getStatByName(HealthStat.id);
        const healthFactor = healthStat ? healthStat.factor : -1;


        const actualRadius = minimalRadius + radius * healthFactor;

        rotation.normalize();

        const lineEnd = new Vector2D(position.x + rotation.x * actualRadius, position.y + rotation.y * actualRadius);

        // Draw the circle (entity)
        ctx.beginPath();
        ctx.arc(position.x, position.y, actualRadius, 0, Math.PI * 2);
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

        const hungerStat = statManager.getStatByName(HungerStat.id);

        const hungerFactor = hungerStat ? hungerStat.factor : -1;

        const lowerLeft = new Vector2D(position.x - radius, position.y + radius + minimalRadius);

        const barHeight = 5;
        const barWidth = 2 * radius;

        ctx.beginPath();
        ctx.rect(lowerLeft.x, lowerLeft.y, barWidth, barHeight);
        ctx.fillStyle = '#8B0000'; // Dark red background
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(lowerLeft.x, lowerLeft.y, barWidth * Math.max(0, healthFactor), barHeight);
        ctx.fillStyle = '#00FF00'; // Green for health
        ctx.fill();
        ctx.closePath();

        // Draw hunger bar (yellow)
        const hungerBarY = lowerLeft.y + barHeight + 2; // Slightly below health bar

        ctx.beginPath();
        ctx.rect(lowerLeft.x, hungerBarY, barWidth, barHeight);
        ctx.fillStyle = '#bf9600'; // Dark yellow background
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(lowerLeft.x, hungerBarY, barWidth * Math.max(0, hungerFactor), barHeight);
        ctx.fillStyle = '#FFFF00'; // Yellow for hunger
        ctx.fill();
        ctx.closePath();
    }

    static drawFood(ctx: CanvasRenderingContext2D, position: Vector2D, radius: number) {
        const halfSize = radius;

        // Glow effect using radial gradient
        const gradient = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, radius * 2);
        gradient.addColorStop(0, "rgba(255, 255, 0, 0.6)");
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

export {EntityRenderer};