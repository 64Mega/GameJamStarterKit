// Sprite object
// --

import Assets from "./assets";
import Global from "./global";

class Sprite {
    constructor(sprite, width=-1, height=-1) {
        // Define width/height to define animated sprites.
        this.sprite = Assets.image_get(sprite);
        this.width = width;
        this.height = height;
        this.speed = 1.0;
        this.numframes = 1;
        this.curframe = 0;

        this.anim_end = null; // Attach a handler to this if you need it.

        if(this.width >= 0) {
            if(this.height === -1) { this.height = this.width; }
            this.image_width = this.sprite.width;
            this.image_height = this.sprite.height;
            this.numframes = Math.floor(this.image_width / this.width);
        } else {
            this.width = this.sprite.width;
            this.height = this.sprite.height;
            this.image_width = this.width;
            this.image_height = this.height;
        }
    }

    draw(x, y, flipped = false) {
        if(this.sprite.ready === null) {
            return;
        }

        let tx = -Global.camera.x;
        let ty = -Global.camera.y;

        let frame = (Math.floor(this.curframe)%this.numframes);
        let fx = frame * this.width;
        let fy = 0;
        if(flipped === false) {
            Global.canvas.context.drawImage(this.sprite,fx, fy, this.width, this.height, x+tx, y+ty, this.width, this.height);
        } else {
            Global.canvas.context.drawImage(this.sprite.flipped, this.image_width-fx-this.width, fy, this.width, this.height, x+tx, y+ty, this.width, this.height);
        }

        this.curframe += this.speed;
        while(this.curframe > this.numframes) {
            this.curframe -= this.numframes;
            if(this.anim_end) {
                this.anim_end();
            }
        }
    }
};

export default Sprite;