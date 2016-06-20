var posX;
var posY;
var ctx;

$(document).ready(function() {
    ctx = loadContext();
    if(ctx){
        var img = new Image();
        img.src = $("#myImage").val();
        img.onload = function() {
            drawImageScaled(img);
        }
    }
        
    $("#myCanvas").mousemove(function(event){
        pintar(event);
    });
});

function loadContext() {
    var element = $("#myCanvas");
    if(element && element.getContext){
        var context = element.getContext('2d');
        if(context){
            return context;
        }
    }
    return false;
}

function drawImageScaled(img) {
    var canvas = ctx.canvas ;
    var hRatio = canvas.width  / img.width;
    var vRatio =  canvas.height / img.height;
    var ratio  = Math.min(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width*ratio) / 2;
    var centerShift_y = (canvas.height - img.height*ratio) / 2;  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width*ratio, img.height*ratio);  
}

function pintar(e){
    posX = e.clientX;
    posY = e.clientY;
    ctx.fillStyle = "#FFF";
    ctx.fillRect(posX, posY, 3, 3);
}