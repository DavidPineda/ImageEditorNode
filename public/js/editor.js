function loadContext(idCanvas) {
    var element = document.getElementById(idCanvas);
    if(element && element.getContext){
        var context = element.getContext('2d');
        if(context){
            return context;
        }
    }
    return false;
}

function drawImageScaled(img, ctx) {
    var canvas = ctx.canvas ;
    var hRatio = canvas.width  / img.width    ;
    var vRatio =  canvas.height / img.height  ;
    var ratio  = Math.min ( hRatio, vRatio );
    var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
    var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(img, 0,0, img.width, img.height, centerShift_x, centerShift_y, img.width*ratio, img.height*ratio);  
}

window.onload = function() {
    var ctx = loadContext('myCanvas');
    if(ctx){
        var img = new Image();
        img.src = document.getElementById('myImage').value;
        img.onload = function() {
            drawImageScaled(img, ctx);
        }
    }
}