var animation_timer=undefined;
var dice_size=6; //it should be constant, we do not expect it to change unless playing D&D
var dice=undefined;

//TODO: We do not need additional state, we have all the information in the html. however, it's shorter this way.
var last_last_number=undefined;
var last_number=undefined;
var current_number=undefined;
function getDiceNumber(num) {
    var numbername = "dice_number_" + num.toString();
    return document.getElementsByClassName(numbername)[0];
}
var selectedNumber=1;
function diceClicked() {
    if(!animation_timer) {
        animation_timer = setInterval(function() {
            //Deactivate all the childs
            var childs=dice.childNodes;
            var curr_child=1;
            for(curr_child=1; curr_child<=dice_size; curr_child++) {
                var son = getDiceNumber(curr_child);
                son.style.display="none";
            }

            //Activate the current number
            var selectedNumber = Math.floor(Math.random()*dice_size)+1;
            if(selectedNumber==0) selectedNumber=1;
            if(selectedNumber>dice_size) selectedNumber=dice_size;
            current_number=selectedNumber;
            var divNum = getDiceNumber(selectedNumber);
            divNum.style.display="block";
        }, 100);
    } else {
        clearInterval(animation_timer);
        console.log("(" + last_last_number + ", " + last_number + ", " + current_number + ")");
        animation_timer=undefined; //We check wether it is started or not by comparing with undefined. It's not a good practice and it might be inneficient.
        //not the first time
        if (!(last_number===undefined)) {
            if(current_number==last_number && last_last_number==last_number)
                points+=100;
            if(current_number==last_number)
                points+=100;//TODO: Set points on the html somewhere
            updatePoints();
        }
        last_last_number=last_number;
        last_number=current_number;
    }
}
var points_div = undefined;
var points=0;
function initialize() {
    dice = document.getElementById("dice_piece");
    points_div = document.getElementById("points");
}
function updatePoints() {
    console.log("points: " + points);
    console.log(points_div);
    points_div.innerHTML = points.toString();
}
