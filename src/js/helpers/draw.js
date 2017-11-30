// Drawing helpers

import Global from './global';
import Assets from './assets';
let draw = {
    clear(clear_color = "#000000") {
        let ctx = Global.canvas.context;
        if(ctx) {
            ctx.fillStyle = clear_color;
            ctx.fillRect(0, 0, Global.canvas.width, Global.canvas.height);
        }        
    },

    rect(x, y, w, h, color, fill) {
        let ctx = Global.canvas.context;
        if(ctx) {
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            if(fill) {
                ctx.fillRect(x, y, w, h);
            } else {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x+w,y);
                ctx.lineTo(x+w,y+h);
                ctx.lineTo(x,y+h);
                ctx.lineTo(x,y);
                ctx.stroke();
            }
        }
    },

    line(x1, y1, x2, y2, color) {
        let ctx = Global.canvas.context;
        if(ctx) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
        }
    },

    sliced(x, y, w, h, sprite, fill) {
        let image = Assets.image_get(sprite);
        let ctx = Global.canvas.context;
        if(!ctx) { return; }
        let imx = Math.floor(image.width / 3);
        let imy = Math.floor(image.height / 3);
        if(!image) { return; }
        if(fill === true) {
            let ptn = ctx.createPattern(image, "repeat");
            this.rect(x, y, w, h, ptn, true);
        }

        let tw = w / imx;
        let th = h / imy;
        for(let i = 0; i < tw; i++) {
            if(i === 0) {
                ctx.drawImage(image, 0, 0, imx, imy, x, y, imx, imy);
                ctx.drawImage(image, 0, imy*2, imx, imy, x, y+((th-1)*imy), imx, imy);
            } else
            if(i === tw-1) {
                ctx.drawImage(image, imx*2, 0, imx, imy, x+(i*imx), y, imx, imy);
                ctx.drawImage(image, imx*2, imy*2, 8, 8, x+(i*imx), y+((th-1)*imy), imx, imy);
            } else {
                ctx.drawImage(image, imx, 0, imx, imy, x+(i*imx), y, imx, imy);
                ctx.drawImage(image, imx, imy*2, imx, imy, x+(i*imx), y+((th-1)*imy), imx, imy);
            }
        }
        for(let i = 1; i < th-1; i++) {
            ctx.drawImage(image, 0, imy, imx, imy, x, y+(i*imy), imx, imy);
            ctx.drawImage(image, imx*2, imy, imx, imy, x+((tw-1)*imx), y+(i*imy), imx, imy);
        }
    },

    sprite(spr) {

    }
};

export default draw;