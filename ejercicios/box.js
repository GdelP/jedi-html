var animation = {
    max_velocity: {x: 50, y: 50},
    min_velocity: {x: -50, y: -50},
    velocity: {x: 20, y: -5},//20% per second
    box_div: undefined,
    animation_began: new Date,
    animation_timer: undefined,

    initial_pos: {x: 0, y: 0},
    animation_began: undefined,

    increase_velocity: function(plus_x, plus_y) {
        console.log("Velocity: From (" + this.velocity.x + ", " + this.velocity.y + ") + (" + plus_x + ", " + plus_y + ")");
        if(this.velocity.x<0) {
            plus_x=-plus_x;
        }
        if(this.velocity.y<0) {
            plus_y=-plus_y;
        }
//TODO: Velocity might be negative
        new_velocity_x = Math.max(this.min_velocity.x, Math.min(this.velocity.x + plus_x, this.max_velocity.x));
        new_velocity_y = Math.max(this.min_velocity.y, Math.min(this.velocity.y + plus_y, this.max_velocity.y));
        console.log(" equals " + new_velocity_x + ", " + new_velocity_y);
        this.changemovement(new_velocity_x, new_velocity_y, this.box_div.style.left, this.box_div.style.top);
    },

    init: function(box_div) {
        this.box_div = box_div;
        this.set_initial_pos(box_div.style.left, box_div.style.top);
    },

    set_initial_pos: function(initial_left, initial_top) {
        if(initial_left===undefined) initial_left=0;
        if(initial_top===undefined) initial_top=0;
        console.log("Before: initial_pos.x: " + this.initial_pos.x);
        console.log("Before: initial_pos.y: " + this.initial_pos.y);
        console.log("Change: initial_left: " + initial_left);
        console.log("Change: initial_top: " + initial_top);
        this.initial_pos.x = initial_left;
        this.initial_pos.y = initial_top;
        if(this.initial_pos.x)
            this.initial_pos.x = parseInt(this.initial_pos.x);
        if(this.initial_pos.y)
            this.initial_pos.y = parseInt(this.initial_pos.y);
        console.log("After: initial_pos.x: " + this.initial_pos.x);
        console.log("After: initial_pos.y: " + this.initial_pos.y);
    },

    /// This function ALWAYS count as a change of velocity
    changemovement: function(velocityx, velocityy, newleft, newtop) {
        this.velocity.x=velocityx;
        this.velocity.y=velocityy;
        console.log("changemovement:: this.set_initial_pos(" + newleft + ", " + newtop + ")");
        this.set_initial_pos(newleft, newtop);
        this.animation_began = new Date;
        console.log("Change velocity to " + this.velocity.x + ", " + this.velocity.y);

        /// This shouldn't be hardcoded here in a real project
        var color = "rgb(" + Math.floor(Math.random()*255).toString() + ", " + Math.floor(Math.random()*255).toString() + ", " + Math.floor(Math.random()*255).toString() + ")";
        console.log(color);
        this.box_div.style.backgroundColor = color;
    },
    resume: function() {
        this.animation_began = new Date;
        console.log("resume:: this.set_initial_pos(" + this.box_div.style.left + ", " + this.box_div.style.top + ")");
        this.set_initial_pos(this.box_div.style.left, this.box_div.style.top);//Reset position!
        this.animation_timer = setInterval(
            (function(anim_parent) {
                var anim = anim_parent;
                function inner() {
                    var time_passed = new Date - anim.animation_began;
                    // Calculate delta: TODO use vectors
//                    var delta = (anim.velocity * time_passed)/1000.0;
//                    var new_left = anim.initial_left + delta;
//                    anim.box_div.style.left = new_left + "%";
                    var new_pos = updateMRU(anim.velocity, time_passed, anim.initial_pos);
                    anim.box_div.style.left = new_pos.x.toString() + "%";
                    anim.box_div.style.top  = new_pos.y.toString() + "%";

                    //collision with right wall
                    if(new_pos.x>100 && anim.velocity.x>0) {
                        anim.changemovement(-anim.velocity.x, anim.velocity.y, new_pos.x, new_pos.y);
                    }
                    //collision with left wall
                    else if(new_pos.x<0 && anim.velocity.x<0) {
                        anim.changemovement(-anim.velocity.x, anim.velocity.y, new_pos.x, new_pos.y);
                    }
                    else if(new_pos.y>100 && anim.velocity.y>0) {
                        anim.changemovement(anim.velocity.x, -anim.velocity.y, new_pos.x, new_pos.y);
                    }
                    //collision with left wall
                    else if(new_pos.y<0 && anim.velocity.y<0) {
                        anim.changemovement(anim.velocity.x, -anim.velocity.y, new_pos.x, new_pos.y);
                    }
                    //we need to detect collisions with upper and down walls
                }
                return inner;
            })(animation), 20);
    },
    pause: function() {
        clearInterval(this.animation_timer);
//        alert("paused");
    }
};
function updateMRU(velocity, time_passed, initial_position) {
    var delta_x = (velocity.x * time_passed)/1000.0;
    var delta_y = (velocity.y * time_passed)/1000.0;
    var new_pos = {x: initial_position.x + delta_x, y: initial_position.y + delta_y};
    console.log("From (" + initial_position.x + ", " + initial_position.y + ") to (" + new_pos.x + ", " + new_pos.y + ") in " + time_passed);
    return new_pos;
}


//box_timeout
function startMovingBox() {
    animation.resume();
}
function stopMovingBox() {
    animation.pause();
}
function accelerate() {
    animation.increase_velocity(1, 1);
}
function initializeBox() {
    animation.init(document.getElementById("box"));
}
function decelerate() {
    animation.increase_velocity(-1, -1);
}
