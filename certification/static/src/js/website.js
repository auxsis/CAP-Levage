var $idToolTipPhone = '';
$( document ).ready(function() {

    //console.log($('.o_livechat_button'));


    $('.o_livechat_button').css('background', 'red');

    $('#open_chat').click(function(){
        if($('.o_livechat_button').length == 0){
            $('#message_modal').find('.modal-title').html('Information');
            $('#message_modal').find('.modal-body').html('Le live chat est indisponible pour le moment. Nous vous invitons à réessayer ultérieurement');
            $('#message_modal').modal();
        }else{
            console.log('live chat is open: ' + $('.o_thread_window').length);
            if($('.o_thread_window').length == 0){
                 $('.o_livechat_button').click();
                livechatIsOpen = true;
                var location = window.location.toString();
                console.log(location);
                if(location.indexOf('/my/equipment/') != -1 || location.indexOf('/my/equipment?id=') != -1){
                    setTimeout(function(){
                        console.log($('.o_thread_window').find('.o_mail_discussion').length);
                        if($('.o_thread_window').find('.o_mail_discussion').length == 0){
                            if(location.indexOf('/my/equipment?id=') != -1){
                                var num_materiel = $("input[name=num_materiel]").val();
                            }else{
                                var num_materiel = $('#num_materiel').html();
                            }
                            var message = 'Bonjour, je rencontre actuellement un problème avec mon matériel (N° matériel: ' + num_materiel + ')';
                            $('.o_chat_mini_composer').find('.o_composer_text_field').val(message);
                        }
                    }, 500);
                }
            }


        }

    });
    setTimeout(function(){
        console.log('livechat');
        console.log($('.o_livechat_button'));
        //$('.o_livechat_button').hide();

        $('.o_livechat_button').css('background', 'red');
    }, 2000);

    $('body').append($('#messageModal'));

    $('#send_message_current_path').val(window.location.href);
    /*$('#sendMessage').click(function(){
        $('#exampleModal').on('shown.bs.modal', function () {
          //$('#myInput').trigger('focus')
        });
    });*/

    /*$('.zoom').click(function(){
        if($(this).hasClass('show')){
            $(this).removeClass('show');
        }else{
            $(this).addClass('show');
        }
    });
    $('.zoom').mouseout(function(){
        //$(this).removeClass('show');
    });*/


    $(window).resize();
    $(window).resize(function(){
        console.log('resize2');
        console.log($('.o_no_autohide_menu'));
        console.log($('.navbar').css('display'));

        var windowWidth = $(window).width();
        console.log('window width: ' + windowWidth);

        console.log($('.navbar'));
        console.log($('.navbar').css('display'));



        if(windowWidth >= 751 && windowWidth < 975){
            //$('.navbar').css('display', 'block');
            $('.o_no_autohide_menu.o_header_affix.affix').hide();
            //$('#preheader').css('float', 'left');
            //$('#top').find('nav').css('float', 'left');
        }
        /*if($('.navbar').css('display') == 'flex')
        {
            console.log('test');
            $($('#top_menu_collapse').parent().find('button')[0]).show();
            $('#top_menu_collapse').hide();
        }else{
            $($('#top_menu_collapse').parent().find('button')[0]).hide();
            $('#top_menu_collapse').show();
        }*/

    });




});