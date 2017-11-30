// Text draw-er class
// For drawing bitmap fonts.
// Bitmap fonts must be a single 'strip' image, starting with the space ' ' character and ending wherever you 
// want to end it.
// --

import Assets from './assets';
import Global from "./global";

const CHAR_OFFSET = ' '.charCodeAt(0);

class Text {
    constructor(font_sprite, glyph_width = 8, glyph_height = 8) {
        this.font = Assets.image_get(font_sprite);
        this.glyph_width = glyph_width;
        this.glyph_height = glyph_height;
    }

    draw(x, y, msg) {
        if(this.font.ready === false) { return; }

        for(let i = 0; i < msg.length; i++) {
            let ch = msg.charCodeAt(i) - CHAR_OFFSET;
            let sx = this.glyph_width * ch;
            Global.canvas.context.drawImage(this.font, sx, 0, this.glyph_width, this.glyph_height, x + i*this.glyph_width, y, this.glyph_width, this.glyph_height);       
        }
    }

    draw_centered_horizontal(y, msg) {
        var cw = Math.floor(Global.canvas.width/2/ Global.canvas.context.scalesize);
        var lw = Math.floor((msg.length*this.glyph_width)/2);
        this.draw(cw-lw,y, msg);        
    }
}

export default Text;