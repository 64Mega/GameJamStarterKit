// 64Mega's Game Jam Quick-Start Kit
// See Readme.md or https://github.com/64Mega/GameJamStarterKit

import * as util from "./util";
import * as assets from "./assets";
import * as audio from "./audio";

let time = Date.now();
let time_last = Date.now();
let can_loop = false;
const SPEED_MOD = 50;

function game_loop() {
    let now = Date.now();
    let delta = (now - time_last) / SPEED_MOD;

    if(assets.assets_loaded() && can_loop) {
        update(delta);
        render();
    } else {
        if(can_loop) {
            let loaded = assets.get_assets_loaded();
            let num = assets.get_num_assets();
            render_load_screen(loaded, num);
        } else {
            wait_for_critical_resources();
        }
    }

    time_last = now;
    requestAnimationFrame(game_loop);
}

function render_load_screen(loaded : number, num : number) {
    let ctx = util.context;
    ctx.fillStyle = "#0A0A0A";
    ctx.imageSmoothingEnabled = false;
    ctx.fillRect(0,0,320,200);
    util.set_font("font/main");
    util.draw_text(0,0,`LOADING ASSETS ${loaded}/${num}, PLEASE WAIT`);
}

function wait_for_critical_resources() {
    // Waits for loading of critical resources
    let font = assets.image_get("font/main");
    if(font && font.ready) {
        util.set_font("font/main");
        can_loop = true;
    } 
}

// Bouncy squares to test
let testsquares = [];

// Remove this later!
function initSquares() {
    for(var i = 0; i < 32; i++) {
        let square = {
            x : (Math.random() * 304) + 8,
            y : (Math.random() * 186) + 8,
            dx : (Math.random() * 100) < 50 ? -1 : 1,
            dy : (Math.random() * 100) < 50 ? -1 : 1
        }
        testsquares.push(square);
    }
}

// Remove this later!
function updateSquares(delta : number) {
    const speed = 5;
    for(var i = 0; i < testsquares.length; i++) {
        let s = testsquares[i];
        let nx = s.x + (speed * delta * s.dx);
        let ny = s.y + (speed * delta * s.dy);

        if(nx < 8) { nx = 8; s.dx = 1; }
        if(nx > 312) { nx = 312; s.dx = -1; }
        if(ny < 8) { ny = 8; s.dy = 1; }
        if(ny > 192) { ny = 192; s.dy = -1; }

        s.x = nx;
        s.y = ny;
    }
}

// Do your updates in this function
function update(delta : number) {
    // Initialize squares if they don't exist, remove this!
    if(testsquares.length === 0) {
        initSquares();
    }

    updateSquares(delta);
}

// Do your rendering in this function
function render() {
    let ctx = util.context;

    // Clear screen

    util.draw_clear("#0A0A0A");

    // Draw four colored squares
    util.draw_fillrect(0,0,16,16,"blue");
    util.draw_fillrect(0,184,16,16,"red");
    util.draw_fillrect(304,0,16,16,"green");
    util.draw_fillrect(304,184,16,16,"yellow");

    // Draw test square

    util.set_color("lightblue");
    for(var i = 0; i < testsquares.length; i++) {
        ctx.fillRect(testsquares[i].x - 8, testsquares[i].y - 8, 16, 16);
    }

    // Draw some text

    util.draw_fillrect(8,8,304,32,"#2535DA");
    
    util.draw_text(16,16,"GAME JAM STARTER KIT");
    util.draw_text(16,24,"https://github.com/64Mega/GameJamStarterKit");
}

function main() {
    util.canvas_init(320, 200);

    loadAssets();

    // Start game loop
    requestAnimationFrame(game_loop);
}

function loadAssets() {
    // Load some system-required assets
    assets.image_load("font/main", "data/images/spr_font1.png");
    assets.sound_load("snd/default", "data/sounds/select_default.wav");

    // Load rest of resources here
}

// Little hack to ensure that timer doesn't fall too far behind in case of
// loss-of-focus

setInterval(() => {
    let now = Date.now();
    if(now - time_last >= 30) { 
        time_last = Date.now();
    }
}, 30);

// Start doing things
main();