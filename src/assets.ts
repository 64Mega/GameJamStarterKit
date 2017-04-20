// Asset manager

let Images = {};

let num_total_assets = 0;
let num_assets_loaded = 0;

export function image_set_ready(image : any) {
    image.ready = true;
    num_assets_loaded++;
    return 
}

export function image_get(alias : string) {
    return Images[alias];
}

export function image_load(alias, path) {
    let new_image = new Image();
    new_image.src = path;
    new_image["ready"] = false;
    new_image.onload = (event) => {
        image_set_ready(new_image);
    };
    num_total_assets++;

    Images[alias] = new_image;
}

export function assets_loaded() : boolean {
    return num_total_assets === num_assets_loaded;
}

export function get_num_assets() : number {
    return num_total_assets;
}

export function get_assets_loaded() : number {
    return num_assets_loaded;
}