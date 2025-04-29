class DrawUtil {
    static circle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, strokeStyle: string = "#000"): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }

    static circleFilled(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fillStyle: string = "#000"): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }

    static circleGradient(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        gradient: CanvasGradient
    ): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }


    static square(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, strokeStyle: string = "#000"): void {
        ctx.strokeStyle = strokeStyle;
        ctx.strokeRect(x, y, size, size);
    }

    static squareFilled(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, fillStyle: string = "#000"): void {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, size, size);
    }

    static rect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, strokeStyle: string = "#000"): void {
        ctx.strokeStyle = strokeStyle;
        ctx.strokeRect(x, y, width, height);
    }

    static rectFilled(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fillStyle: string = "#000"): void {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, width, height);
    }

    static line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, strokeStyle: string = "#000"): void {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
}

export {DrawUtil}
