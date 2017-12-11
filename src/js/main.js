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
import {Vec2, DistanceCheck, CollisionBox, Box, CollideAgainst} from "./helpers/math";
import {Interpolate} from "./helpers/math";
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
    const deltaTime = 1 / 60;
    let accTime = 0;
    let lastTime = 0;

    function update(time = 0) {
        accTime += (time - lastTime) / 1000;
        while(accTime > deltaTime) {
            draw.clear("black");    

            // == Draws and updates go here
            
            accTime -= deltaTime;
        }

        lastTime = time;
        
        requestAnimationFrame(update);  
    };

    update(0);
}