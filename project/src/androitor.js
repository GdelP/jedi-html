var robot=undefined;
var objective=undefined;
var windows=undefined;//TODO: blink
var currentImg=0;
var points=0;
var deathTimer=undefined;
var robotDelay=5;
var minRobotDelay=2;
var maxRobotDelay=20;

function initialize() {
    alert("Salva las manzanas. Haz clic al logo de windows para ganar bono de velocidad");
    objective = document.getElementById("objective");
    robot = document.getElementById("androitor");
    windows = document.getElementById("windows");
    robot.style.left = "0";
    robot.style.top = "0";
    randomizePosition();
}
function randomizeWin() {
    windows.style.left = (Math.random()*70 +10).toString() + "%";
    windows.style.top = (Math.random()*70 +10).toString() + "%";
}
function randomizePosition() {
    objective.style.left = (Math.random()*70 +10).toString() + "%";
    objective.style.top = (Math.random()*70 +10).toString() + "%";
    robot.style.left = objective.style.left;
    robot.style.top = objective.style.top;
}
function setRobotSpeed() {
    robot.style.transition = "left " + robotDelay + "s ease, right " + robotDelay + "s ease, top " + robotDelay + "s ease";
}
function clicOnWindows() {
    robotDelay = Math.min(maxRobotDelay, robotDelay+1);
    randomizeWin();
    setRobotSpeed();
}
function clicOnObjective() {
    //Change image
    currentImg = (currentImg+1)%3;
    objective.src="img-androitor/a" + (currentImg+1).toString() + ".png";

    //Add points
    points+=100;

    //Moar speed
    console.log("delay from " + robotDelay);
    robotDelay = Math.max(minRobotDelay, robotDelay-0.1);
    console.log("     to " + robotDelay);
    setRobotSpeed();

    //Randomize position
    randomizePosition();

    //Launch death timer
    if(deathTimer) {
        clearInterval(deathTimer);
        deathTimer=undefined;//Por si acaso.
    }
    deathTimer = setInterval(die, robotDelay*1000);//TODO: Change this 5000 in accordance with the transition animations

}

function die() {
    alert("You died with " + points.toString() + " points. Let's go again!");
    points=0;
}
