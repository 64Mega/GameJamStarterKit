// Utility functions/classes

import assets = require("./assets");

export let context = null;
export let canvas = null;
let context_width, context_height;

export function canvas_init(width: number, height: number) {
    // Sets canvas size to fill the page as best as possible
    // while maintaining integral scale and the desired resolution

    let win_width = window.innerWidth;
    let win_height = window.innerHeight;
    let scale_a = Math.floor((win_width / width)) - 1;
    let scale_b = Math.floor((win_height / height)) - 1;
    let scale = scale_a < scale_b ? scale_a : scale_b;
    if(scale < 1) { scale = 1; }
    let final_width = width * scale;
    let final_height = height * scale;

    canvas = document.createElement("canvas");

    if(canvas) {
        canvas.width = final_width;
        canvas.height = final_height;
        canvas.id = "gameCanvas";
        context = canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        context.scale(scale,scale);
        context.imageSmoothingEnabled = false;
        context_width = width;
        context_height = height;
        context.lineWidth = 1.0;
    }
}

let util_font_current = null;

export function set_font(font : string) {
   let img = assets.image_get(font); 
   if(img) {
       util_font_current = img;
   }
}

export function draw_text(x : number, y : number, str : string) {
    const char_offset = ' '.charCodeAt(0);
    if(!util_font_current) { return; }
    for(var i = 0; i < str.length; i++) {
        let char_code = str.charCodeAt(i) - char_offset;
        let sx = 5 * char_code;

        context.drawImage(util_font_current, sx, 0, 5, 8, x + i*5, y, 5, 8);
    }
}

export function draw_clear(clear_color : string) {
    context.fillStyle = "#0A0A0A";
    context.fillRect(0,0,context_width,context_height);
}

export function set_color(color : string) {
    context.fillStyle = color;
    context.strokeStyle = color;
}

export function draw_fillrect(x : number, y : number, w : number, h : number, color : string) {
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

export function draw_line(x1 : number, y1 : number, x2 : number, y2 : number, color : string) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
}

export function draw_rect(x : number, y : number, w : number, h : number, color : string) {
    context.lineStyle = color;
    draw_line(x,y,x+w,y,color);
    draw_line(x+w,y,x+w,y+h,color);
    draw_line(x+w,y+h,x,y+h,color);
    draw_line(x,y+h,x,y+h,color);
}