$(document).ready(function(){
    $("#uploadInput").on("change", function(){
        $('.determinate').text('0%');
        $('.determinate').width('0%');
        var files = $(this).get(0).files;
        if(files.length > 0){
            var formData = new FormData();
            for(var i = 0; i < files.length; i++){
                var file = files[i];
                formData.append('uploads[]', file, file.name);
            }
            $.ajax({
                url: '/upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){
                    console.log('upload successful!' + data);
                },
                xhr: function() {
                    // create an XMLHttpRequest
                    var xhr = new XMLHttpRequest();

                    // listen to the 'progress' event
                    xhr.upload.addEventListener('progress', function(evt) {
                        if (evt.lengthComputable) {
                            // calculate the percentage of upload completed
                            var percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);

                            // update the Bootstrap progress bar with the new percentage
                            $('.determinate').text(percentComplete + '%');
                            $('.determinate').width(percentComplete + '%');

                            // once the upload reaches 100%, set the progress bar text to done
                            if (percentComplete === 100) {
                                $('.determinate').html('Done');
                            }
                        }
                    }, false);
                    return xhr;
                }                
            });
        }        
    });
});