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
Global.camera = new Vec2(0, 0);

let ctx = Global.canvas.context;
ctx.imageSmoothingEnabled = false;

// Scale the canvas up a bit for bigger pixels
scaleContext(2);

// Initialize input
Input.init();

// Wait for assets to finish loading then start doing initialization that relies on resources
Assets.onfinished = () => {
    const deltaTime = 1000 / 60;
    let accTime = 0;
    let lastTime = 0;

    let text = new Text("spr_font1", 5, 8);
    let x = 123;
    let y = 150;
    let c = 0.0;

    function update(time = 0) {
        accTime += (time - lastTime);
        while(accTime >= deltaTime) {
            // Updates go here
            c += 0.04;
            
            x = 118 + (Math.sin(c *  0.5) * 118);
            y = 150 + (Math.sin(c) * 32);                    

            accTime -= deltaTime;
        }

        // == Drawing code goes here
        draw.clear("rgba(0, 0, 0, 0.5)");    
        text.draw(x, y, "64Mega's GameJamStarterKit v0.0.3");

        lastTime = time;
        
        requestAnimationFrame(update);  
    };

    update(0);
}