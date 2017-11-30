// Main Entrypoint for the game
// --

import Canvas from "./helpers/canvas";
import GameAudio from "./helpers/audio";
import Text from "./helpers/text";
import Global from "./helpers/global";
import draw from "./helpers/draw";
import Sprite from "./helpers/sprite";
import Assets from "./helpers/assets";
import Input from "./helpers/input";
import {scaleContext} from "./helpers/util";
import "./loadassets";

Global.canvas = new Canvas(800,600,"2d");

let ctx = Global.canvas.context;
ctx.imageSmoothingEnabled = false;

// Scale the canvas up a bit for bigger pixels
scaleContext(2);

// Initialize input
Input.init();

// Wait for assets to finish loading then start doing initialization that relies on resources
Assets.onfinished = () => {
    let mytext = new Text("spr_font1", 5, 8);
    let y = 0;
    function update(deltatime) {
        draw.clear("");    
        mytext.draw_centered_horizontal(y,"Game Jam Boilerplate 2.0");
    
        if(Input.key_held(Input.KEYS.DOWN)) {
            y++;
        }

        requestAnimationFrame(update);
    };

    update(0);
}