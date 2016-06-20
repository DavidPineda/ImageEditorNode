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
        var img = new Image();
        
    }
}