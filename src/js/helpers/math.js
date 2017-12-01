// Some math and calculation helpers

export class Vec2 {
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

export function vec2(x, y) {
    return {x, y};
}

export class Vec3 {
    constructor(x, y, z) {
        this.set(x, y, z);
    }

    set(x, y, z) {
        this.x = y;
        this.y = y;
        this.z = z;
    }
}

export class Box {
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

export function CollisionBox(box1, box2) {
    return !(
        box1.x + box1.w < box2.x ||
        box1.x > box2.x + box2.w ||
        box1.y + box1.h < box2.y ||
        box1.y > box2.y + box2.h
    );
}

export function CollideAgainst(box1, box2, horizontal) {
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

export function DistanceCheck(point_a, point_b, distance) {
    let dstx = Math.abs(point_b.x - point_a.x);
    let dsty = Math.abs(point_b.y - point_a.y);
    return ((dstx*dstx)+(dsty*dsty) <= (distance*distance));
}

export function clamp(val, lower, upper) {
    return Math.min(Math.max(val, lower), upper);
}

// These functions accept Vec2's or Vec2 likes.
export let Interpolate = {
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