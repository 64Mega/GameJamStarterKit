import Global from "./helpers/global";
import draw from "./helpers/draw";
import Sprite from "./helpers/sprite";
import Assets from "./helpers/assets";
import Input from "./helpers/input";
import {Vec2, DistanceCheck, CollisionBox, Box, CollideAgainst} from "./helpers/math";
import {MoveAgainstVert, MoveAgainstHorz} from "./helpers/math";
import {Interpolate} from "./helpers/math";
import {collision_with_ground, collision_with_ground_at, COL_Ground} from "./colliders.js";
import {colliding_with_ground_at} from "./colliders.js";

class Player {
    constructor(x, y) {
        this.pos = new Vec2(x, y);
        this.sprites = {};
        this.flipped = false;
        this.speed = 100;
        this.accel = 0.1; 
        this.max_accel = 1.0;
        this.velocity = new Vec2(0.0, 0.0);
        this.gravity = 10;
        this.box = new Box(this.pos.x+7, this.pos.y, 12, 24);
        this.touching_ground = false;

        this.init_sprites();
    }

    init_sprites() {
        this.sprites["idle"] = new Sprite("spr_player_idle", 24, 24);
        this.sprites["walk"] = new Sprite("spr_player_walk", 24, 24);
        this.sprites["jump"] = new Sprite("spr_player_jump", 24, 24);
        this.sprites.walk.speed = 0.25;
    }

    update(deltaTime) {
        if(Input.key_held(Input.KEYS.RIGHT) 
            && !colliding_with_ground_at(this.pos.x+22,this.pos.y)) {
            if(this.velocity.x <= 1) { this.velocity.x += this.accel; } else {this.velocity.x = 1.0;}
            this.flipped = false;
        } else 
        if(Input.key_held(Input.KEYS.LEFT) 
            && !colliding_with_ground_at(this.pos.x+2,this.pos.y)) {
            if(this.velocity.x >= -1) { this.velocity.x -= this.accel; } else {this.velocity.x = -1.0;}
            this.flipped = true;
        } else {
            if(this.velocity.x > 0.0) { this.velocity.x -= this.accel; }
            if(this.velocity.x < 0.0) { this.velocity.x += this.accel; }
        }

        if(Math.abs(this.velocity.x) < 0.01) { this.velocity.x = 0; }

        if(this.velocity.x > 0) {            
            this.pos.x += Interpolate.POWSTEP(this.velocity.x) * this.speed * this.max_accel * deltaTime;
            collision_with_ground_at(this.pos.x+21, this.pos.y+23, (other) => {
                this.velocity.x = 0;
                MoveAgainstHorz(this.box, other.box);
                this.pos.set(this.box.x-7, this.box.y);
            });
            collision_with_ground_at(this.pos.x+21, this.pos.y, (other) => {
                this.velocity.x = 0;
                MoveAgainstHorz(this.box, other.box);
                this.pos.set(this.box.x-7, this.box.y);
            });
        } else
        if(this.velocity.x < 0) {
            this.pos.x -= Interpolate.POWSTEP(this.velocity.x) * this.speed * this.max_accel * deltaTime;
            collision_with_ground_at(this.pos.x+3, this.pos.y+23, (other) => {
                this.velocity.x = 0;
                MoveAgainstHorz(this.box, other.box);
                this.pos.set(this.box.x-7, this.box.y);
            });
            collision_with_ground_at(this.pos.x+3, this.pos.y, (other) => {
                this.velocity.x = 0;
                MoveAgainstHorz(this.box, other.box);
                this.pos.set(this.box.x-7, this.box.y);
            });
        } else {
            this.sprites.walk.curframe = 0;
        }

        if(Input.key_held(Input.KEYS.SHIFT)) {
            this.max_accel = 2;
        } else {
            this.max_accel = 1;
        }

        if(Input.key_pressed(Input.KEYS.UP)) {
            if(this.touching_ground === true) {
                this.velocity.y = -250*deltaTime;
            }
        }

        this.velocity.y += this.gravity * deltaTime;
        this.pos.y += this.velocity.y;

        this.box.set_pos(this.pos.x+7, this.pos.y);

        this.touching_ground = false;
        collision_with_ground(this, (other) => {
            if(this.velocity.y > 0) {
                this.velocity.y = 0;
                this.box = MoveAgainstVert(this.box, other.box);
                //CollideAgainst(this.box, other.box);
                this.pos.set(this.box.x-7, this.box.y);
                this.touching_ground = true;
            } else 
            if(this.velocity.y < 0) {
                this.velocity.y = 0;
                
                this.box = MoveAgainstVert(this.box, other.box);
                this.box.y += 1;
                this.pos.set(this.box.x-7, this.box.y);
            }
        });
    }

    render(cam) {
        for(let i = 0; i < COL_Ground.length; i++) {
            
            draw.sliced(COL_Ground[i].box.x, COL_Ground[i].box.y, COL_Ground[i].box.w, COL_Ground[i].box.h, "slice_grass", true);
            //draw.rect(COL_Ground[i].box.x, COL_Ground[i].box.y, COL_Ground[i].box.w, COL_Ground[i].box.h, "red", false);
        }

        if(this.touching_ground) {
            if(this.velocity.x === 0) {
                this.sprites.idle.draw(this.pos.x, this.pos.y, this.flipped);
            } else {
                this.sprites.walk.speed = this.accel * 1.5;
                this.sprites.walk.draw(this.pos.x, this.pos.y, this.flipped);
            }
        } else {
            this.sprites.jump.draw(this.pos.x, this.pos.y, this.flipped);
        }

        if(this.pos.x > Global.camera.x + 220 && Global.camera.x >= 0) {
            Global.camera.x = this.pos.x - 220;
            console.log("Camera pan");
        }
        if(this.pos.x < Global.camera.x + 180) {
            Global.camera.x = this.pos.x - 180;
            console.log("Camera pan");
            if(Global.camera.x < 0) { Global.camera.x = 0; }
        }
        
    }
}

export default Player;