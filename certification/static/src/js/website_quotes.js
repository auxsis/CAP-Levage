$( document ).ready(function() {

    var table = $('#myTable').DataTable({
		"pageLength": 10,
		searching: false,
		"bLengthChange" : false,
		"language": {
            "url": "/certification/static/src/js/datatables/French.json"
        }
	});
	table.on( 'draw', function () {
		//$('#myTable').show();
		//$('#myTable_wrapper').find('.row').removeClass('row').addClass('col-xs-12');
		$('#myTable').show();
		$('#myTable').parent().parent().addClass('col-xs-12');
        $('#myTable_info').parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#myTable_paginate').parent().parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#myTable_paginate').find('.pagination').css('float', 'left');
	} );

    /*$('.checkbox_quote').change(function() {

        var disabledButton = true;
        $('.checkbox_quote').each(function(key, value){
            if($(this).is(":checked")) {
              disabledButton = false;
           }
        });

        if(disabledButton){
            if(!$('#btnAccept').hasClass('disabled')) $('#btnAccept').addClass('disabled');
        }else{
            $('#btnAccept').removeClass('disabled');
        }

    });*/

    /*$('#btnAccept').click(function(){
        if($('#btnAccept').hasClass('disabled')) return false;
    });*/


    $('.btn_save_num_commande').click(function(){
        console.log('save');
        var id = $(this).data('devis');
        var num_commande_required = $("#num_commande_client_" + id).prop('required');
        if(num_commande_required && $("#num_commande_client_" + id).val().length == 0){
            $("#num_commande_client_error" + id).show();
            return false;
        }else{
            $("#num_commande_client_error" + id).hide();
        }
        $('#order_to_update').val(id);
        //$('#num_commande_client_update_' + id).val(id);
        $('#form_quotes_accept').submit();
    });
    $('.input_num_commande').change(function(e){
        var id = $(this).data('id');
        var num_commande_required = $("#num_commande_client_" + id).prop('required');
        if(num_commande_required && $("#num_commande_client_" + id).val().length == 0){
            $("#num_commande_client_error" + id).show();
        }else{
            console.log("ok");
            $("#num_commande_client_error" + id).hide();
        }
	});

    $('.btnUploadBonDeCommande').click(function(){
	    $(this).parent().find('.inputUploadBonDeCommande').click();
	});
	$('.inputUploadBonDeCommande').change(function(e){
        var fileName = e.target.files[0].name;
        $(this).parent().find('.uploadBonDeCommande_name').html(fileName);
        var id = $(this).data('devis');
        $('#btn_save_num_commande' + id).click();
	});


    $('.btn_voir_devis').click(function(){
//        console.log($(this).data('id'))
        window.location = "/my/quote/see/" + $(this).data('id');
    });

});