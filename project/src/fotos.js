var currentPhoto=0;
var minPhoto=0;
var maxPhoto=4;
var div_foto=undefined;
function initialize() {
    div_foto=document.getElementById("center-image");
}

function changePhoto(d) {
    //Un-highlight
    old_foto=document.getElementById("pre"+currentPhoto.toString());
    old_foto.style.opacity="0.2";

    currentPhoto += d;
    currentPhoto = Math.min(maxPhoto, Math.max(minPhoto, currentPhoto));

    div_foto.src="image" + currentPhoto.toString() + ".png";
    console.log("currentPhoto " + currentPhoto);
    console.log("div_foto " + div_foto);
    console.log("div_foto.style" + div_foto.style);

    //Highlight the right one
    old_foto=document.getElementById("pre"+currentPhoto.toString());
    old_foto.style.opacity="0.9";
}
