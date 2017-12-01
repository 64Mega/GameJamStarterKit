/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Simple asset manager

let Images = {};
let Sounds = {};

let num_total_assets = 0;
let num_assets_loaded = 0;

function image_set_ready(image) {
    image.ready = true;
    num_assets_loaded++;
}

function sound_set_ready(sound) {
    if(sound.is_ready === false) {
        sound.is_ready = true;
        num_assets_loaded++;
    }
}

let Assets = {
    image_get(image_alias) {
        return Images[image_alias];
    },

    sound_get(sound_alias) {
        return Sounds[sound_alias];
    },

    image_load(alias, path) {
        let image = new Image();
        image.src = path;
        image.ready = false;
        image.onload = () => {
            image_set_ready(image);
            // We bake a flipped image into the object for convenience in the Sprite class
            image.flipped = document.createElement('canvas');
            image.flipped.width = image.width;
            image.flipped.height = image.height;
            let tctx = image.flipped.getContext('2d');
            tctx.scale(-1,1);
            tctx.drawImage(image,-image.width,0);
            if(num_assets_loaded === num_total_assets) {
                if(Assets.onfinished) { Assets.onfinished(); }
            }
        };
        num_total_assets++;

        Images[alias] = image;
    },

    sound_load(alias, path) {
        let sound = new Audio();
        sound.is_ready = false;
        sound.preload = "true";
        sound.addEventListener("canplaythrough", () => {
            sound_set_ready(sound);
            if(num_assets_loaded === num_total_assets) {
                if(Assets.onfinished) { Assets.onfinished(); }
            }
        });
        sound.src = path;
        num_total_assets++;
        sound.load();
        Sounds[alias] = sound;
    },

    get_total() {
        return num_total_assets;
    },

    get_loaded() {
        return num_assets_loaded;
    },

    ready() {
        return num_assets_loaded === num_total_assets;
    },

    onfinished : null
}

/* harmony default export */ __webpack_exports__["a"] = (Assets);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Simple 'global' store
// --

let Global = {

};

/* harmony default export */ __webpack_exports__["a"] = (Global);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = scaleContext;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(1);
// Helper functions
// --



// Dumb jQuery replacement, just returns one element.
if(!window.$) {
    window.$ = function(query) {
        return document.querySelector(query);
    };
}

// This variation returns all matches
if(!window.$_) {
    window.$_ = function(query) {
        return document.querySelelectorAll(query);
    };
}

// Sets the context's scale and pollutes the context with some scaling values for use elsewhere
function scaleContext(scale) {
    __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].canvas.context.scale(scale, scale);
    __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].canvas.context.scalesize = scale;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export vec2 */
/* unused harmony export CollisionBox */
/* unused harmony export CollideAgainst */
/* unused harmony export DistanceCheck */
/* unused harmony export clamp */
/* unused harmony export Interpolate */
// Some math and calculation helpers

class Vec2 {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    static dot(a, b) {
        return ((a.x*b.x)+(a.y*b.y));
    }

    static addv(a, b) {
        return {
            x: a.x + b.x,
            y: a.y + b.y
        };
    }

    static addi(v, num) {
        return {
            x: v.x + num,
            y: v.y + num
        };
    }

    static subv(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        };
    }

    static subi(v, num) {
        return {
            x: v.x - num,
            y: v.y - num
        };
    }

    static mults(v, num) {
        return {
            x: v.x * num,
            y: v.y * num
        }
    }

    static len(v) {
        return Math.sqrt((v.x*v.x) + (v.y*v.y));
    }

    static norm(v) {
        let l = Vec2.len(v);
        if(l === 0) { return v; }
        else {
            let scale = 1.0 / l;
            return {
                x: v.x * scale,
                y: v.y * scale
            };
        }
    }

    static make(x, y) {
        return {x, y};
    }
}
/* unused harmony export Vec2 */


function vec2(x, y) {
    return {x, y};
}

class Vec3 {
    constructor(x, y, z) {
        this.set(x, y, z);
    }

    set(x, y, z) {
        this.x = y;
        this.y = y;
        this.z = z;
    }
}
/* unused harmony export Vec3 */


class Box {
    constructor(x, y, w, h) {
        this.set_pos(x, y);
        this.set_size(w, h);
    }

    set_pos(x, y) {
        this.x = x;
        this.y = y;
    }

    set_size(w, h) {
        this.w = w;
        this.h = h;
    }
}
/* unused harmony export Box */


function CollisionBox(box1, box2) {
    return !(
        box1.x + box1.w < box2.x ||
        box1.x > box2.x + box2.w ||
        box1.y + box1.h < box2.y ||
        box1.y > box2.y + box2.h
    );
}

function CollideAgainst(box1, box2, horizontal) {
    let result_box = new Box(box1.x, box1.y, box1.w, box1.h);
    if(CollisionBox(box1, box2)) {
        let cb1 = new Vec2(box1.x + box1.w/2, box1.y + box1.h/2);
        let cb2 = new Vec2(box2.x + box2.w/2, box2.y + box2.h/2);
        
        if(cb1.y >= box2.y && cb1.y <= box2.y + box2.h) {
            if(cb1.x < cb2.x) {
                result_box.x = box2.x - box1.w;
            } else {
                result_box.x = box2.x + box2.w;
            }
        }
        
        if(cb1.x >= box2.x && cb1.x <= box2.x + box2.w) {
            if(cb1.y < cb2.y) {
                result_box.y = box2.y - box1.h;
            } else {
                result_box.y = box2.y + box2.h;
            }
        }
    }

    return result_box;
}

function DistanceCheck(point_a, point_b, distance) {
    let dstx = Math.abs(point_b.x - point_a.x);
    let dsty = Math.abs(point_b.y - point_a.y);
    return ((dstx*dstx)+(dsty*dsty) <= (distance*distance));
}

function clamp(val, lower, upper) {
    return Math.min(Math.max(val, lower), upper);
}

// These functions accept Vec2's or Vec2 likes.
let Interpolate = {
    lerpv(start, end, scale) {
        let v = Vec2.subv(end, start);
        v = Vec2.mults(v, scale);
        return Vec2.addv(start, v);
    },

    lerpi(start, end, scale) {
        return (scale*(end-start))+start;
    },
    
    SMOOTHSTEP(t) {
        return ((t*t)*(3-2*t));
    },

    SMOOTHERSTEP(t) {
        return ((t*t*t)*(t*(t*6-15)+10));
    },

    POWSTEP(t) {
        return t*t;
    },

    POWSTEPINV(t) {
        return (1 - (1 - t) * (1 - t));
    }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_canvas__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_audio__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_text__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_global__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_draw__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_sprite__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers_assets__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__helpers_input__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__helpers_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__helpers_math__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__loadassets__ = __webpack_require__(11);
// Main Entrypoint for the game
// --














__WEBPACK_IMPORTED_MODULE_3__helpers_global__["a" /* default */].canvas = new __WEBPACK_IMPORTED_MODULE_0__helpers_canvas__["a" /* default */](800,600,"2d");

let ctx = __WEBPACK_IMPORTED_MODULE_3__helpers_global__["a" /* default */].canvas.context;
ctx.imageSmoothingEnabled = false;

// Scale the canvas up a bit for bigger pixels
Object(__WEBPACK_IMPORTED_MODULE_8__helpers_util__["a" /* scaleContext */])(2);

// Initialize input
__WEBPACK_IMPORTED_MODULE_7__helpers_input__["a" /* default */].init();

// Wait for assets to finish loading then start doing initialization that relies on resources
__WEBPACK_IMPORTED_MODULE_6__helpers_assets__["a" /* default */].onfinished = () => {
    const deltaTime = 1 / 60;
    let accTime = 0;
    let lastTime = 0;

    function update(time = 0) {
        accTime += (time - lastTime) / 1000;
        while(accTime > deltaTime) {
            __WEBPACK_IMPORTED_MODULE_4__helpers_draw__["a" /* default */].clear("black");    

            // == Draws and updates go here
            
            accTime -= deltaTime;
        }

        lastTime = time;
        requestAnimationFrame(update);  
    };

    update(0);
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(2);
// Canvas helpers



class Canvas {
    constructor(width, height, contextType = '2d') {
        this.width = width;
        this.height = height;
        this._canvas = $('#GameCanvas');

        if(!this._canvas) {
            let canvas = document.createElement('canvas');
            canvas.id = "GameCanvas";
            document.body.append(canvas);
            this._canvas = canvas;
        }

        this._canvas.width = this.width;
        this._canvas.height = this.height;

        this._context = this._canvas.getContext('2d');
    }

    get context() {
        return this._context;
    }

    get canvas() {
        return this._canvas;
    }

    get size() {
        return {
            width: this.width,
            height: this.height
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (Canvas);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets__ = __webpack_require__(0);
// Audio helpers



let GameAudio = {};

GameAudio.play_sound = function(sound_alias, volume = 1.0) {
    let sound = __WEBPACK_IMPORTED_MODULE_0__assets__["a" /* default */].sound_get(sound_alias);
    if(sound.is_ready) {
        sound.volume = volume;
        if(sound.paused === false) {
            sound.pause();
            sound.currentTime = 0;
        }
        sound.play();
    }
}

GameAudio.play_music = function(music_alias, volume = 1.0) {
    let music = assets.sound_get(music_alias);
    if(sound.is_ready) {
        sound.loop = true;
        sound.volume = volume;
        sound.play();
    }
}

/* unused harmony default export */ var _unused_webpack_default_export = (GameAudio);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__(1);
// Text draw-er class
// For drawing bitmap fonts.
// Bitmap fonts must be a single 'strip' image, starting with the space ' ' character and ending wherever you 
// want to end it.
// --




const CHAR_OFFSET = ' '.charCodeAt(0);

class Text {
    constructor(font_sprite, glyph_width = 8, glyph_height = 8) {
        this.font = __WEBPACK_IMPORTED_MODULE_0__assets__["a" /* default */].image_get(font_sprite);
        this.glyph_width = glyph_width;
        this.glyph_height = glyph_height;
    }

    draw(x, y, msg) {
        if(this.font.ready === false) { return; }

        for(let i = 0; i < msg.length; i++) {
            let ch = msg.charCodeAt(i) - CHAR_OFFSET;
            let sx = this.glyph_width * ch;
            __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].canvas.context.drawImage(this.font, sx, 0, this.glyph_width, this.glyph_height, x + i*this.glyph_width, y, this.glyph_width, this.glyph_height);       
        }
    }

    draw_centered_horizontal(y, msg) {
        var cw = Math.floor(__WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].canvas.width/2/ __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].canvas.context.scalesize);
        var lw = Math.floor((msg.length*this.glyph_width)/2);
        this.draw(cw-lw,y, msg);        
    }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Text);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets__ = __webpack_require__(0);
// Drawing helpers



let draw = {
    clear(clear_color = "#000000") {
        let ctx = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].canvas.context;
        if(ctx) {
            ctx.fillStyle = clear_color;
            ctx.fillRect(0, 0, __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].canvas.width, __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].canvas.height);
        }        
    },

    rect(x, y, w, h, color, fill) {
        let ctx = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].canvas.context;
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
        let ctx = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].canvas.context;
        if(ctx) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
        }
    },

    sliced(x, y, w, h, sprite, fill) {
        let image = __WEBPACK_IMPORTED_MODULE_1__assets__["a" /* default */].image_get(sprite);
        let ctx = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].canvas.context;
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

/* harmony default export */ __webpack_exports__["a"] = (draw);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__(1);
// Sprite object
// --




class Sprite {
    constructor(sprite, width=-1, height=-1) {
        // Define width/height to define animated sprites.
        this.sprite = __WEBPACK_IMPORTED_MODULE_0__assets__["a" /* default */].image_get(sprite);
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

        let frame = (Math.floor(this.curframe)%this.numframes);
        let fx = frame * this.width;
        let fy = 0;
        if(flipped === false) {
            __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].canvas.context.drawImage(this.sprite,fx, fy, this.width, this.height, x, y, this.width, this.height);
        } else {
            __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].canvas.context.drawImage(this.sprite.flipped, this.image_width-fx-this.width, fy, this.width, this.height, x, y, this.width, this.height);
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

/* unused harmony default export */ var _unused_webpack_default_export = (Sprite);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Input helper
let keys = {};
let Input = {};

let handlers_set = false;
function keydown_handler(key_event) {
    if(keys[key_event.keyCode] === undefined) {
        keys[key_event.keyCode] = 0;
    }
    if(keys[key_event.keyCode] === 0) {keys[key_event.keyCode] = 1};
    if(key_event.keyCode !== Input.KEYS.F11 && key_event.keyCode !== Input.KEYS.F5) {
        key_event.preventDefault();
    }
}

function keyup_handler(key_event) {
    keys[key_event.keyCode] = 0;
    key_event.preventDefault();
}

Input.key_pressed = function(keyCode) {
    if(keys[keyCode] === 1) {        
        keys[keyCode] = 2;
        return true;
    }
    
    return false;
}

Input.key_held = function(keyCode) {
    return keys[keyCode] > 0 && keys[keyCode] !== undefined;
}

Input.init = function() {
    document.addEventListener("keydown", keydown_handler, false);
    document.addEventListener("keyup", keyup_handler, false);
}

Input.KEYS = {
    "BACKSPACE" : 8,
    "TAB": 9,
    "ENTER": 13,
    "RETURN": 13,
    "SHIFT": 16,
    "CTRL": 17,
    "ALT": 18,
    "PAUSE": 19,
    "BREAK": 19,
    "CAPSLOCK": 20,
    "ESCAPE": 27,
    "PAGEUP": 33,
    "PAGEDOWN": 34,
    "END": 35,
    "HOME": 36,
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "INSERT": 45,
    "DELETE": 46,
    "NUM0": 48,
    "NUM1": 49,
    "NUM2": 50,
    "NUM3": 51,
    "NUM4": 52,
    "NUM5": 53,
    "NUM6": 54,
    "NUM7": 55,
    "NUM8": 56,
    "NUM9": 57,
    "A":65,
    "B":66,
    "C":67,
    "D":68,
    "E":69,
    "F":70,
    "G":71,
    "H":72,
    "I":73,
    "J":74,
    "K":75,
    "L":76,
    "M":77,
    "N":78,
    "O":79,
    "P":80,
    "Q":81,
    "R":82,
    "S":83,
    "T":84,
    "U":85,
    "V":86,
    "W":87,
    "X":88,
    "Y":89,
    "Z":90,
    "WINLEFT": 91,
    "WINRIGHT": 92,
    "SELECT": 93,
    "NUMPAD0": 96,
    "NUMPAD1": 97,
    "NUMPAD2": 98,
    "NUMPAD3": 99,
    "NUMPAD4": 100,
    "NUMPAD5": 101,
    "NUMPAD6": 102,
    "NUMPAD7": 103,
    "NUMPAD8": 104,
    "NUMPAD9": 105,
    "MULTIPLY": 106,
    "ADD": 107,
    "SUBTRACT": 109,
    "DECIMALPOINT": 110,
    "DIVIDE": 111,
    "F1": 112,
    "F2": 113,
    "F3": 114,
    "F4": 115,
    "F5": 116,
    "F6": 117,
    "F7": 118,
    "F8": 119,
    "F9": 120,
    "F10": 121,
    "F11": 122,
    "F12": 123,
    "NUMLOCK": 144,
    "SCROLLLOCK": 145,
    "SEMICOLON": 186,
    "EQUALS": 187,
    "COMMA": 188,
    "DASH": 189,
    "PERIOD": 190,
    "SLASH": 191,
    "GRAVE": 192,
    "LBRACKET": 219,
    "BACKSLASH": 220,
    "RBRACKET": 221,
    "QUOTE": 222
};

/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_assets__ = __webpack_require__(0);
// Load all of your assets here.



__WEBPACK_IMPORTED_MODULE_0__helpers_assets__["a" /* default */].sound_load("snd_default", "sounds/snd_default.wav");

__WEBPACK_IMPORTED_MODULE_0__helpers_assets__["a" /* default */].image_load("spr_font1", "images/spr_font1.png");

/***/ })
/******/ ]);