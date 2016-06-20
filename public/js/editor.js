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

window.onload = function() {
    var ctx = loadContext('myCanvas');
    if(ctx){
        var img = new Image(200, 200);
        img.src = document.getElementById('myImage').value;
        img.onload = function() {
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        }
    }
}