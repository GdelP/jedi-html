
var imageToMove=undefined;
var width=0;
var height=0;
function initialize() {
    imageToMove = document.getElementById("randomMove");
/*    console.log("Complete");
    console.log(imageToMove);
    console.log("Style");
    console.log(imageToMove.style);
    console.log("width");
    console.log(imageToMove.style.width);
    console.log("height");
    console.log(imageToMove.style.height);
    width = parseInt(imageToMove.style.width);
    height = parseInt(imageToMove.style.height);
    if(!width) width=0;
    if(!height) height=0;
    console.log(imageToMove);
    console.log(width);
    console.log(height);*/
}
var images = ["planet.png",
    "rocket.png",
    "gradient.gif",
    "sprite.gif"
];
function randommove() {
    imageToMove.style.left = (Math.random()*100).toString() + "%";
    imageToMove.style.top  = (Math.random()*100).toString() + "%";
    var imageIndex = Math.floor(Math.random()*images.length);
    imageToMove.src = images[imageIndex];
}
