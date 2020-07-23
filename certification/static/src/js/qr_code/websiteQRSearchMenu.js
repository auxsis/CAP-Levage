//Cherche et ferme la webcam
function stopStreamedVideo(video){
    if(!video) return false;
    let stream = video.srcObject;
    if(!stream) return false;
    let tracks = stream.getTracks();
    if(!tracks) return false;
    tracks.forEach(function(track){
        track.stop();
    });

    video.srcObject = null;
}



function resizeModalQrCode(){
    console.log('qrCodeModal resize');
    if($('#qrCodeModalMenu').length > 0){
        console.log('resize');
        var windowWidth = $(window).width();
        $('#qrCodeModalMenu').css('width', windowWidth * .80 + 'px');
        $('#qrCodeModalMenu').css('left', ((windowWidth * .20) / 2) + 'px');
        $('#qrCodeModalMenu').css('top', '10%');
        $('#qrCodeModalMenu').css('height', 'auto');

        var headerHeight = $('#qrCodeModalMenu').find('.modal-header').height();
        var bodyHeight = $('#qrCodeModalMenu').find('.modal-body').height();
        var footerHeight = $('#qrCodeModalMenu').find('.modal-header').height();
        var padding = parseInt($('#qrCodeModalMenu').find('.modal-header').css('padding-top'));
        //$('#qrCodeModal').css('height', headerHeight + bodyHeight + footerHeight + (padding * 0) + 'px');
    }
}

$( document ).ready(function() {
    $(window).resize(function(){
        console.log('window resize');
        console.log('qrCodeModal resize');
    if($('#qrCodeModalMenu').length > 0){
        console.log('resize');
        var windowWidth = $(window).width();
        $('#qrCodeModalMenu').css('width', windowWidth * .80 + 'px');
        $('#qrCodeModalMenu').css('left', ((windowWidth * .20) / 2) + 'px');
        $('#qrCodeModalMenu').css('top', '10%');
        $('#qrCodeModalMenu').css('height', 'auto');

        var headerHeight = $('#qrCodeModalMenu').find('.modal-header').height();
        var bodyHeight = $('#qrCodeModalMenu').find('.modal-body').height();
        var footerHeight = $('#qrCodeModalMenu').find('.modal-header').height();
        var padding = parseInt($('#qrCodeModalMenu').find('.modal-header').css('padding-top'));
        $('#qrCodeModalMenu').css('height', headerHeight + bodyHeight + footerHeight + (padding * 6) + 'px');
    }
        resizeModalQrCode();
    });

    $('#search_qr_code_menu').click(function(){
        console.log('show modal');
        var video = $('#qrCodeModalMenu').find('video')[0];
        /*if(!video) {
            $('#message_modal').find('.modal-title').html('Information');
            $('#message_modal').find('.modal-body').html('Aucune caméra détectée !');
            $('#message_modal').modal();
            return false;
        }*/


        $('#qrCodeModalMenu').modal('show');
        $('#qrCodeModalMenu').css('overflow-y', 'hidden');
        $('#qrCodeModalMenu').find('video').remove();
        $('#scriptCamContentMenu').html('');
        $('#qr_error_menu').html('');
        $('#scriptCamContentMenu').append('<script type="text/javascript" src="/certification/static/src/js/qr_code/QRSearchMenu.js"></script>');

        //$('#qrCodeModal').addClass('in');
        //$('.modal-backdrop').addClass('in');

        $('#qrCodeOriginMenu').val('');
        //setTimeout(function(){ resizeModalQrCode(); }, 3000);

        $('#qrCodeModalCloseMenu').click(function(){
              var video = $('#qrCodeModalMenu').find('video')[0];
              stopStreamedVideo(video);
              //$('#qrCodeModal').remove();
              //$('.modal-backdrop').remove();
        });
        /*$modalContent = $('<div></div>');
        $modalContent.load( '/certification/static/src/qrCodeModal.html', function() {
                $('body').append($modalContent.html());
                $('#qrCodeModal').modal('show');
                $('#qrCodeModal').addClass('in');
                $('.modal-backdrop').addClass('in');
                console.log('test');
                $('#qrCodeOrigin').val('');
                //setTimeout(function(){ resizeModalQrCode(); }, 3000);

                console.log('test2');

                $('#qrCodeModalClose').click(function(){
                      var video = $('#qrCodeModal').find('video')[0];
                      stopStreamedVideo(video);
                      $('#qrCodeModal').remove();
                      $('.modal-backdrop').remove();
                });
        });*/
});
});
