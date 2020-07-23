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

$('#search_qr_code').click(function(){
        console.log('show modal');
        var video = $('#qrCodeModal').find('video')[0];
        /*if(!video) {
            $('#message_modal').find('.modal-title').html('Information');
            $('#message_modal').find('.modal-body').html('Aucune caméra détectée !');
            $('#message_modal').modal();
            return false;
        }*/


        $('#qrCodeModal').modal('show');
        $('#qrCodeModal').css('overflow-y', 'hidden');
        $('#qrCodeModal').find('video').remove();
        $('#scriptCamContent').html('');
        $('#qr_error').html('');
        $('#scriptCamContent').append('<script type="text/javascript" src="/certification/static/src/js/qr_code/QRSearch.js"></script>');

        //$('#qrCodeModal').addClass('in');
        //$('.modal-backdrop').addClass('in');

        $('#qrCodeOrigin').val('');
        //setTimeout(function(){ resizeModalQrCode(); }, 3000);

        $('#qrCodeModalClose').click(function(){
              var video = $('#qrCodeModal').find('video')[0];
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

function resizeModalQrCode(){
    console.log('qrCodeModal resize');
    if($('#qrCodeModal').length > 0){
        console.log('resize');
        var windowWidth = $(window).width();
        $('#qrCodeModal').css('width', windowWidth * .80 + 'px');
        $('#qrCodeModal').css('left', ((windowWidth * .20) / 2) + 'px');
        $('#qrCodeModal').css('top', '10%');
        $('#qrCodeModal').css('height', 'auto');

        var headerHeight = $('#qrCodeModal').find('.modal-header').height();
        var bodyHeight = $('#qrCodeModal').find('.modal-body').height();
        var footerHeight = $('#qrCodeModal').find('.modal-header').height();
        var padding = parseInt($('#qrCodeModal').find('.modal-header').css('padding-top'));
        //$('#qrCodeModal').css('height', headerHeight + bodyHeight + footerHeight + (padding * 0) + 'px');
    }
}

$( document ).ready(function() {
    $(window).resize(function(){
        console.log('window resize');
        console.log('qrCodeModal resize');
    if($('#qrCodeModal').length > 0){
        console.log('resize');
        var windowWidth = $(window).width();
        $('#qrCodeModal').css('width', windowWidth * .80 + 'px');
        $('#qrCodeModal').css('left', ((windowWidth * .20) / 2) + 'px');
        $('#qrCodeModal').css('top', '10%');
        $('#qrCodeModal').css('height', 'auto');

        var headerHeight = $('#qrCodeModal').find('.modal-header').height();
        var bodyHeight = $('#qrCodeModal').find('.modal-body').height();
        var footerHeight = $('#qrCodeModal').find('.modal-header').height();
        var padding = parseInt($('#qrCodeModal').find('.modal-header').css('padding-top'));
        $('#qrCodeModal').css('height', headerHeight + bodyHeight + footerHeight + (padding * 6) + 'px');
    }
        resizeModalQrCode();
    });
});
