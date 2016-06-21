var ctx;

window.addEventListener('load', function(){
    drawImage();
}, false);

document.getElementById('btnDownload').addEventListener('click', function(){
    downloadCanvas(this);
}, false);

document.getElementById('btnReload').addEventListener('click', function(){
    drawImage();
}, false);

function loadContext() {
    var element = document.getElementById('myCanvas'); 
    if(element && element.getContext){
        var context = element.getContext('2d');
        if(context){
            return context;
        }
    }
    return false;
}

function drawImage() {
    ctx = loadContext();
    if(ctx){
        var img = new Image();
        img.src = document.getElementById('myImageSrc').value;
        img.onload = function() {
            drawImageScaled(img);
        }
    }
}

function drawImageScaled(img) {
    var canvas = ctx.canvas ;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio  = Math.min(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width*ratio) / 2;
    var centerShift_y = (canvas.height - img.height*ratio) / 2;  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width*ratio, img.height*ratio); 
    canvas.addEventListener('mousemove', function(event){
        var point = getMousePos(canvas, event);
        pintar(point);
    });
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top  
    };
}

function pintar(point){
    ctx.fillStyle = "#FFF";
    ctx.fillRect(point.x, point.y, 2, 2);
}

function downloadCanvas(link){
    link.href = document.getElementById('myCanvas').toDataURL();
    var name = document.getElementById('myImageName').value;
    name = name.substring(0, name.indexOf(".") - 1) + 'png';
    link.download = name;
}