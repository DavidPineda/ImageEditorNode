$(document).ready(function(){
    $('.carousel').carousel({dist:-50, shift:20, padding:20});

    $(".carousel-item").click(function(){
        $("#btnEdit").removeClass("disabled");
        $("#hfSrcImage").val($(this).children().attr("src"));
        $("#hfNameImage").val($(this).children().attr("name"));
    });

    $("#btnEdit").click(function(){
        $("#imgSrc").val($("#hfSrcImage").val());
        $("#imgName").val($("#hfNameImage").val());
        $("#myForm").submit();
    });
});