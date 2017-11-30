// Helper functions
// --

import Global from "./global";

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
export function scaleContext(scale) {
    Global.canvas.context.scale(scale, scale);
    Global.canvas.context.scalesize = scale;
}