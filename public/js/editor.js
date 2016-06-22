var ctx;
var selectColor;
var socket = io();

$(document).ready(function(){
    $('#btnOpenModal').leanModal();

    $('.modal-close').click(function(){
        selectColor = $(this).attr('data-color');
        $('#modal1').closeModal();
    });

    socket.on('print', function(point){
        pintar(point, point.color);
    });        

});

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
        pintar(point, getColor(selectColor));
    });
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top  
    };
}

function pintar(point, color){
    if(color != ""){        
        ctx.fillStyle = color;
        ctx.fillRect(point.x, point.y, 2, 2);
        point.color = color;
        socket.emit('print', point);        
    }
}

function downloadCanvas(link){
    link.href = document.getElementById('myCanvas').toDataURL();
    var name = document.getElementById('myImageName').value;
    name = name.substring(0, name.indexOf(".") - 1) + 'png';
    link.download = name;
}

function getColor(colorName){
    switch(colorName){
        case "red":
            return "#f44336";
        case "green":
            return "#4caf50";
        case "blue":
            return "#2196f3";
        case "orange":
            return "#ff9800";
        case "black":
            return "#000000";
        case "purple":
            return "#9c27b0";
        case "pink":
            return "#e91e63";
        case "brown":
            return "#795548";
        case "grey":
            return "#9e9e9e";
        case "yellow":
            return "#ffeb3b";
        case "cyan":
            return "#00bcd4";
        case "teal":
            return "#009688";
        default:
            return "";
    }
}