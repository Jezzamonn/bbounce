export default class Controller {

    constructor() {
        this.animAmt = 0;
        this.period = 3;
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
        this.renderBall(context, 0, 0, 4 * this.animAmt);
    }

    /**
     * @param {!CanvasRenderingContext2D} context
     */
    renderBall(context, x, y, animAmt) {
        context.beginPath();
        context.fillStyle = 'black';

        const bounceAmt = animAmt % 1;
        const heightAmt = bounceAmt * (1 - bounceAmt) * 4;
        const height = 50;

        context.arc(x, y - height * heightAmt, 20, 0, 2 * Math.PI);
        context.fill();
    }

}
