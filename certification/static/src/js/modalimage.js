$( document ).ready(function() {

    // Get the modal
    var modal = document.getElementById("modalImage");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    $('.zoom').click(function(){
        /*if($(this).hasClass('show')){
            $(this).removeClass('show');
        }else{
            $(this).addClass('show');
        }*/
        //var modalImg = document.getElementById("img01");
        $('body').css('overflow', 'hidden');
        var captionText = document.getElementById("caption");

        modal.style.display = "block";
        var src = $(this).attr('src');
        var index = src.indexOf('id=');
        var equipmentId = $(this).data('equipment');
        console.log("equipmentId: " + equipmentId);
        var srcFullScreen = '/web/image?model=critt.equipment&id=' + equipmentId + '&field=image_medium';
        $("#modalImage").find("img").attr("src", srcFullScreen);// this.src;
        if($(this).attr('alt')) captionText.innerHTML = $(this).attr('alt'); //this.alt;


        ///web/image?model=critt.equipment&amp;id=%s&amp;field=image_small'

        ///web/image?model=critt.equipment&id=896&field=image_small

    });

    $("#modalImage").find(".close").click(function(){
        modal.style.display = "none";
        $('body').css('overflow', 'auto');
    });


    /*var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    }*/

});