import { slurp } from './util';

export default class Controller {

    constructor() {
        this.animAmt = 0;
        this.period = 10;
    }

    /**
     * Simulate time passing.
     *
     * @param {number} dt Time since the last frame, in seconds 
     */
    update(dt) {
        this.animAmt += dt / this.period;
        this.animAmt %= 1;
    }

    /**
     * Render the current state of the controller.
     *
     * @param {!CanvasRenderingContext2D} context
     */
    render(context) {
        const layers = 10;
        const layerDist = 0.5 * 38;

        for (let l = 0; l <= layers; l++) {
            let numCircles = 6 * l;
            if (numCircles < 1) {
                numCircles = 1;
            }

            const bounceMult = 10 + Math.abs(l);
            const size = 0.5 * (12 - 0.8 * Math.abs(l));

            for (let c = 0; c < numCircles; c++) {
                const angleAmt = c / numCircles;
                const angle = 2 * Math.PI * (1 / 4 + angleAmt);

                const x = l * layerDist * Math.cos(angle);
                const y = l * layerDist * Math.sin(angle);

                this.renderBall(context, x, y, size, bounceMult * this.animAmt);
            }
        }
    }

    /**
     * @param {!CanvasRenderingContext2D} context
     */
    renderBall(context, x, y, size, animAmt) {

        const bounceAmt = animAmt % 1;
        const heightAmt = bounceAmt * (1 - bounceAmt) * 4;
        const height = 10;
        const bounceHeight = height * heightAmt;
        const groundPosition = y + height / 2;

        const shadowPosition = groundPosition + size;
        const shadowAmt = 1 - heightAmt;
        const shadowSize = slurp(0.4 * size, 0.9 * size, shadowAmt);
        const shadowAlpha = slurp(0.1 * shadowAmt, 0.2 * shadowAmt, shadowAmt);

        context.save();
        context.beginPath();
        context.fillStyle = 'black';
        context.arc(x, groundPosition - bounceHeight, size, 0, 2 * Math.PI);
        context.fill();

        context.globalAlpha = shadowAlpha;
        context.beginPath();
        context.ellipse(x, shadowPosition, shadowSize, 0.4 * shadowSize, 0, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    }

}
