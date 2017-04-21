// Asset manager

let Images = {};
let Sounds = {};

let num_total_assets = 0;
let num_assets_loaded = 0;

// *** Image Loaders/Getters/Setters ***

export function image_set_ready(image : any) {
    image.ready = true;
    num_assets_loaded++;
    return;
}

export function image_get(alias : string) {
    return Images[alias];
}

export function image_load(alias : string, path : string) {
    let new_image = new Image();
    new_image.src = path;
    new_image["ready"] = false;
    new_image.onload = (event) => {
        image_set_ready(new_image);
    };
    num_total_assets++;

    Images[alias] = new_image;
}

// *** Sound Loaders/Getters/Setters ***

export function sound_set_ready(sound : any) {
    if(sound.is_ready === false) { // Sanity check for reasons
        sound.is_ready = true;
        num_assets_loaded++;
    }
    return;
}

export function sound_get(alias : string) {
    return Sounds[alias];
}

export function sound_load(alias : string, path : string) {
    let sound = new Audio();
    sound["is_ready"] = false;
    sound.preload = "true";
    sound.addEventListener("canplaythrough", () => {
        sound_set_ready(sound);
    });
    sound.src = path;
    num_total_assets++;
    sound.load();
    Sounds[alias] = sound;
}

// *** General Asset Info ***

export function assets_loaded() : boolean {
    return num_total_assets >= num_assets_loaded;
}

export function get_num_assets() : number {
    return num_total_assets;
}

export function get_assets_loaded() : number {
    return num_assets_loaded;
}