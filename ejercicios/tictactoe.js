var canPlay=true;
var current_player='X';
var gameState=[
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];
function displaySquare(x, y, content) {
    //TODO: Cache the results, tyhis is akin to use jQuery
    var square_name = "ttt-sq-" + x.toString() + y.toString();
    var div_square = document.getElementById(square_name);
    div_square.innerHTML=content;
}
function displayGameState() {
    var line=0;
    for(line=0; line<gameState.length; line++) {
        var col=0;
        var curr_line=gameState[line];
        for(col=0; col<curr_line.length; ++col) {
            displaySquare(line, col, curr_line[col]);
        }
    }
}
function clic(x,y) {
    if(!canPlay) {
        alert("Refresh for playing again");
        return;
    }
    console.log("called clic");
    if(gameState[x][y]!=' ') {
        alert("You cant make that movement"); //TODO: Red glow instead of alert
        return;
    }
    console.log("gameState[" + x + "][" + y + "]= " + current_player);
    gameState[x][y]= current_player;
    if(current_player=='X')
        current_player='O';
    else if(current_player=='O')
        current_player='X';
    else alert("Current player is " + current_player + " which is unknown for us");
    //update win text
    var winner = whoWon();
    if(winner!=' ') {
        var div_winner = document.getElementById("winner-text");
        div_winner.innerHTML=winner;
        canPlay=false;
        var div_again = document.getElementById("play-again");
        div_again.style.display="block";
        console.log(div_again);
        current_player=' ';
    }

    //update play text
    var div_player = document.getElementById("player");
    div_player.innerHTML=current_player;

    //display game
    displayGameState();
}

function whoWon() {
    var line=0;
    var col=0;
    var res=' ';

    //horizontal
    for(line=0; line<3; line++) {
        var who=gameState[line][0];
        var who_won=true;
        for(col=1; col<3; col++) {
            who_won = who_won && (gameState[line][col]==who);
        }
        if(who_won) res=who;
    }
    //vertical
    for(col=0; col<3; col++) {
        var who=gameState[0][col];
        var who_won=true;
        for(line=1; line<3; line++) {
            who_won = who_won && (gameState[line][col]==who);
        }
        if(who_won) res=who;
    }
    //diagonal 1
    if(gameState[0][0]==gameState[1][1] && gameState[0][0]==gameState[2][2] && gameState[0][0]!=' ')
        res=gameState[0][0];
    //diagonal 2
    if(gameState[0][2]==gameState[1][1] && gameState[0][2]==gameState[2][0] && gameState[0][2]!=' ')
        res=gameState[0][2];
    return res;
}

function initialize() {
//    dice = document.getElementById("dice_piece");
//    points_div = document.getElementById("points");
}
