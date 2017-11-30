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

export default Assets;