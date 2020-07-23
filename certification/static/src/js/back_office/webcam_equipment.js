var video, canvas, photo, modal;
var indexSwitch = 0;
function initCam(){
    video = document.querySelector("#videoElement");
    canvas = document.getElementById('canvas_webcam');
    //photo = document.querySelector('img');

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (err0r) {
            console.log("Something went wrong!");
        });
    }
}

function takephoto() {
    video = document.querySelector("#videoElement");
    canvas = document.getElementById('canvas_webcam');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;

    //photo = document.getElementById('capture_webcam_img');
    photo2 = document.getElementsByClassName('img-responsive');

    //Pour changer l'image sur l'équipement
    indexSwitch++;
    $('#switch').find('input').val(indexSwitch);
    $('#switch').find('input').change();

    var ctx = canvas.getContext("2d").drawImage(video, 0, 0, 640, 480);
    var data = canvas.toDataURL('image/png');
    //photo.setAttribute('src', data);
    if(photo2[0]){
        photo2[0].setAttribute('src', data);
        modal.style.display = "none";
    }
    //var URL = canvas.toDataURL(image/png);
    //console.log(URL);
    $('#capture_ok').val(1);

    // Arrêt webcam
    stopStreamedVideo(video);
}

//Cherche et ferme la webcam
function stopStreamedVideo(video){
    let stream = video.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach(function(track){
        track.stop();
    });

    video.srcObject = null;
}

// Get the button that opens the modal
/*var btn = document.getElementById("btnLaunchWebcam");
modal = document.getElementById("webcam_popup");
btn.onclick = function() {
    modal.style.display = "block";
    initCam();
}*/

// Get the <span> element that closes the modal
/*var span = document.getElementById("webcam_popup_close");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/

$( document ).ready(function() {

    /*$('.o_input_file').change(function(){
        $('#capture_ok').val(0);
    });
    var alreadyClick = false;
    $('.o_form_button_save').click(function(e){
        //if(alreadyClick) return false;
        var equipment_id = $('#equipment_id').find('span').html();

        canvas = document.getElementById('canvas_webcam'); // document.querySelector('canvas');
        var data = canvas.toDataURL('image/png');
        if($('#capture_ok').val() == 1){
            $.ajax({
              type: "POST",
              url: '/testsavephoto',
              data: { equipment_id: equipment_id, data: data.replace('data:image/png;base64,', '')},
              success: function(resp){},
              dataType: 'json'
            });
        }
        //return false;
        //if(!alreadyClick) alreadyClick = true;
    });*/
});
