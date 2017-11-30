// Canvas helpers

import Util from "./util";

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

export default Canvas;
