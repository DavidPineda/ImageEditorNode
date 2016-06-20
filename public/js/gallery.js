$(document).ready(function(){
    $('.carousel').carousel({dist:-50, shift:20, padding:20});

    $(".carousel-item").click(function(){
        $("#btnEdit").removeClass("disabled");
    });
});