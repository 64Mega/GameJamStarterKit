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
        let t = Global.camera;
        if(ctx) {
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            if(fill) {
                ctx.fillRect(x-t.x, y-t.y, w, h);
            } else {
                ctx.beginPath();
                ctx.moveTo(x-t.x, y-t.y);
                ctx.lineTo(x-t.x+w,y-t.y);
                ctx.lineTo(x-t.x+w,y-t.y+h);
                ctx.lineTo(x-t.x,y-t.y+h);
                ctx.lineTo(x-t.x,y-t.y);
                ctx.stroke();
            }
        }
    },

    line(x1, y1, x2, y2, color) {
        let ctx = Global.canvas.context;
        let t = Global.camera;
        if(ctx) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(x1-t.x,y1-t.y);
            ctx.lineTo(x2-t.x,y2-t.y);
            ctx.stroke();
        }
    },

    sliced(x, y, w, h, sprite, fill) {
        let image = Assets.image_get(sprite);
        let ctx = Global.canvas.context;
        let t = Global.camera;
        if(!ctx) { return; }
        let imx = Math.floor(image.width / 3);
        let imy = Math.floor(image.height / 3);
        if(!image) { return; }
        
        let tw = w / imx;
        let th = h / imy;

        if(fill === true) {
            for(let iy = 1; iy < th-1; iy++) {
                for(let ix = 1; ix < tw-1; ix++) {
                    ctx.drawImage(image, imx, imy, imx, imy, x - t.x + ix * imx, y - t.y + iy * imy, imx, imy);
                }
            }
        }

        for(let i = 0; i < tw; i++) {
            if(i === 0) {
                ctx.drawImage(image, 0, 0, imx, imy, x-t.x, y-t.y, imx, imy);
                ctx.drawImage(image, 0, imy*2, imx, imy, x-t.x, y-t.y+((th-1)*imy), imx, imy);
            } else
            if(i === tw-1) {
                ctx.drawImage(image, imx*2, 0, imx, imy, x-t.x+(i*imx), y-t.y, imx, imy);
                ctx.drawImage(image, imx*2, imy*2, imx, imy, x-t.x+(i*imx), y-t.y+((th-1)*imy), imx, imy);
            } else {
                ctx.drawImage(image, imx, 0, imx, imy, x-t.x+(i*imx), y-t.y, imx, imy);
                ctx.drawImage(image, imx, imy*2, imx, imy, x-t.x+(i*imx), y-t.y+((th-1)*imy), imx, imy);
            }
        }
        for(let i = 1; i < th-1; i++) {
            ctx.drawImage(image, 0, imy, imx, imy, x-t.x, y-t.y+(i*imy), imx, imy);
            ctx.drawImage(image, imx*2, imy, imx, imy, x-t.x+((tw-1)*imx), y-t.y+(i*imy), imx, imy);
        }
    },

    sprite(spr, x, y) {
        let t = Global.camera;
        let s = Assets.image_get(spr);
        if(!s) { return; }
        let ctx = Global.canvas.context;
        if(!ctx) { return; }
        ctx.drawImage(s, x-t.y, y-t.y);
    },

    background(spr, x, y) {
        let s = Assets.image_get(spr);
        if(!s) { return; }
        let ctx = Global.canvas.context;
        if(!ctx) { return; }
    }
};

export default draw;