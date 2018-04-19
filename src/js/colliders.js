// Collections of collidable objects.

import {CollisionBox, CollisionPointBox} from "./helpers/math.js";
import {Box} from "./helpers/math.js";

export let COL_Ground = [];
export let COL_Enemies = [];
export let COL_Items = [];

export function collision_with_ground(entity, callback) {
    for(let i = 0; i < COL_Ground.length; i++) {
        if(CollisionBox(entity.box, COL_Ground[i].box)) {
            callback(COL_Ground[i]);
        }
    }
}

export function colliding_with_ground_at(x, y) {
    for(let i = 0; i < COL_Ground.length; i++) {
        if(CollisionPointBox(x, y, COL_Ground[i].box)) {
            return true;
        }
    }
    return false;
}

export function collision_with_ground_at(x, y, callback) {
    for(let i = 0; i < COL_Ground.length; i++) {
        if(CollisionPointBox(x, y, COL_Ground[i].box)) {
            callback(COL_Ground[i]);
        }
    }
}

