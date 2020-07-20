var i = 0;
var idsToDelete = [];

function loadDatePicker(element){
    var id = $(element).attr('name').split('_')[2];
    var value = $(element).val();
    $(element).datepicker("destroy");
    $(element).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy"
        });
    //$(element).datepicker("refresh");
    $(element).datepicker('setDate', value);
}

$('#is_bloque').change(function() {
    if ($(this).is(':checked')){
        $('#div_observ_blocage').css("display", "");
    } else {
        $('#div_observ_blocage').css("display", "none");
        $('#observ_blocage').val('');
    }
});

$('#referent').change(function() {
    if ($(this).val() == -1){
        $('#equipe').val('-1');
        $('#agence').val('-1');
    } else {
        var equipe_id = $(this).find('option:selected').data('equipe');
        if (equipe_id) {
            $('#equipe').val(equipe_id);
        }
        var agence_id = $(this).find('option:selected').data('agence');
        if (agence_id){
            $('#agence').val(agence_id);
        }
    }
});

function updateNextAudit(){
    console.log("updateNextAudit");
    var periode = -1;
    $('input[name=periode_checkbox]').each(function(key, value){
        console.log('val checkbiox ' + $(this).val());
        if( $(this).is(':checked') ){
            periode = parseInt($(this).val());
        }
    });
    console.log('periode checkbox ' + periode);
    if(periode == -1){
        periode = $('#category_id').find('option:selected').data('periode');
        if(!periode) return false;
    }


        console.log(periode);

       var date_dernier_audit = $('#date_dernier_audit').val();
        console.log('date dernier audit: ' + date_dernier_audit);
       var parts = date_dernier_audit.split("/");
        var dt = new Date(parseInt(parts[2], 10),
              parseInt(parts[1], 10) - 1,
              parseInt(parts[0], 10));

        if((dt instanceof Date && !isNaN(dt)) == false){
            console.log('date du jour');
            dt = new Date();
        }
        console.log(dt);

        //if(dt instanceof Date && !isNaN(dt)){
            console.log('month ' + dt.getMonth() + ' periode ' + periode);
           dt.setMonth(dt.getMonth() + periode);
           console.log(dt);
           var month = dt.getMonth() + 1;
           if(month < 10) month = '0' + month;
           var day = dt.getDate();
           if(day < 10) day = '0' + day;

           var date_suivant = day + '/' + month + '/' + dt.getFullYear();

           $('#date_audit_suivant').val(date_suivant);
           //$('#audit_suivant').val(date_suivant);
           //$('#audit_suivant_display').html(date_suivant);
           console.log('date suivant ' + date_suivant);
        //}
}
function isElingue(){
    var text = '';
    console.log($('#category_id'));
    if($('#category_id').length > 0){ //form
        console.log('form');
        text = $('#category_id').find('option:selected').text().toLowerCase();
    }else{ //fiche
        console.log('fiche');
        text = $('#content_type').html().toLowerCase();
    }

    if(text.indexOf("élingue") != -1 || text.indexOf("elingue") != -1){
        return true;
    }
    return false;
}
function showField(){

    console.log('show field');
    if($('#category_id').length > 0){
        console.log($('#category_id').find('option:selected'));
        console.log($('#category_id').find('option:selected').data('periode'));

        console.log($('#category_id').find('option:selected').data('displaybrins'));
        console.log($('#category_id').find('option:selected').data('displaycmu'));
        console.log($('#category_id').find('option:selected').data('displaylongueur'));
        console.log($('#category_id').find('option:selected').data('displaytmu'));
        console.log($('#category_id').find('option:selected').data('displaymodel'));
        console.log($('#category_id').find('option:selected').data('displaydiametre'));
        console.log($('#category_id').find('option:selected').data('displaygrade'));
        console.log($('#category_id').find('option:selected').data('displaynumlot'));
        console.log($('#category_id').find('option:selected').data('displaynumcommande'));

        if($('#category_id').find('option:selected').data('displaybrins')){
            $('#content_nombre_brins').removeClass('hidden');
            document.getElementById('nombre_brins').required = true;
        }else{
             $('#content_nombre_brins').addClass('hidden');
             $('#nombre_brins').val(0);
             document.getElementById('nombre_brins').required = false;
        }

        if($('#category_id').find('option:selected').data('displaycmu')){
            $('#content_cmu').removeClass('hidden');
            document.getElementById('cmu').required = true;
        }else{
             $('#content_cmu').addClass('hidden');
             $('#cmu').val('');
             document.getElementById('cmu').required = false;
        }

        if($('#category_id').find('option:selected').data('displaytmu')){
            $('#content_tmu').removeClass('hidden');
            document.getElementById('tmu').required = true;
        }else{
             $('#content_tmu').addClass('hidden');
             $('#tmu').val('');
             document.getElementById('tmu').required = false;
        }

        if($('#category_id').find('option:selected').data('displaylongueur')){
            $('#content_longueur').removeClass('hidden');
            document.getElementById('longueur').required = true;
        }else{
             $('#content_longueur').addClass('hidden');
             $('#longueur').val(0);
             document.getElementById('longueur').required = false;
        }

        if($('#category_id').find('option:selected').data('displaymodel')){
            $('#content_model').removeClass('hidden');
            document.getElementById('model').required = true;
        }else{
             $('#content_model').addClass('hidden');
             $('#model').val('');document.getElementById('model').required = false;

        }

        if($('#category_id').find('option:selected').data('displaydiametre')){
            $('#content_diametre').removeClass('hidden');
            document.getElementById('diametre').required = true;
        }else{
             $('#content_diametre').addClass('hidden');
             $('#diametre').val('');
             document.getElementById('diametre').required = false;
        }

        if($('#category_id').find('option:selected').data('displaygrade')){
            $('#content_grade').removeClass('hidden');
            document.getElementById('grade').required = true;
        }else{
             $('#content_grade').addClass('hidden');
             $('#grade').val('');
             document.getElementById('grade').required = false;
        }

        if($('#category_id').find('option:selected').data('displaynumlot')){
            $('#content_num_lot').removeClass('hidden');
            document.getElementById('num_lot').required = true;
        }else{
             $('#content_num_lot').addClass('hidden');
             $('#num_lot').val('');
             document.getElementById('num_lot').required = false;
        }

        if($('#category_id').find('option:selected').data('displaynumcommande')){
            $('#content_num_commande').removeClass('hidden');
            document.getElementById('num_commande').required = true;
        }else{
             $('#content_num_commande').addClass('hidden');
             $('#num_commande').val('');
             document.getElementById('num_commande').required = false;
        }
    }


    /*if(isElingue()){
        console.log('is elingue');
        $('#content_nombre_brins').removeClass('hidden');
        $('#content_longueur').removeClass('hidden');
    }else{
        console.log('is not elingue');
        $('#content_nombre_brins').addClass('hidden');
        $('#content_longueur').addClass('hidden');
        $('#nombre_brins').val(0);
        $('#longueur').val(0);
    }*/
}

/*function myFunction(event){
    console.log($('#category_id').val());
    alert('submit');
    if($('#category_id').val() == -1){

        $('.alert').html('Veuillez renseigner un type !');
        $('.alert').alert();
        return false;
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
}
*/

function getParameterByName(name)
{
    var url_string = window.location; //window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("nfc");
    return c;
}

$( document ).ready(function() {

    $('#btnAddEquipe').click(function(){
        $('#btnCancelEquipe').removeClass('hidden').show();
        $('.equipeContent2').removeClass('hidden').show();
        $('#btnAddEquipe').hide();
        $('.equipeContent').hide();
        $('#equipeAdd').val('');
	});
	$('#btnCancelEquipe').click(function(){
        $('#btnAddEquipe').show();
        $('.equipeContent').show();
        $('#btnCancelEquipe').hide();
        $('.equipeContent2').hide();
        $('#equipeAdd').val('');
	});

	$('#btnAddAgence').click(function(){
        $('#btnCancelAgence').removeClass('hidden').show();
        $('.agenceContent2').removeClass('hidden').show();
        $('#btnAddAgence').hide();
        $('.agenceContent').hide();
        $('#agenceAdd').val('');
	});
	$('#btnCancelAgence').click(function(){
        $('#btnAddAgence').show();
        $('.agenceContent').show();
        $('#btnCancelAgence').hide();
        $('.agenceContent2').hide();
        $('#agenceAdd').val('');
	});

    $('.btn_voir_devis').click(function(){
        //console.log(this.value)
        window.location = "/my/quote/see/" + $(this).data('id')
    });

    var nfc = getParameterByName('nfc');
    if(nfc){
        console.log('nfc: ' + nfc);
        $('#nfc').val(nfc);
    }

    /*$.ajax({
        type: "POST",
        url: '/my/gettoken',
        data: {

        },
        success: function (result) {
            console.log(result);

        }
    });*/


    $('.equipment_is_bloque').each(function(key, value){
        console.log('val checkbiox ' + $(this).val());
        if($(this).val() == '1'){
            $(this).prop( "checked", true );
        }else{
            $(this).prop( "checked", false );
        }
    });

    $('.equipment_is_bloque').change(function(key, value){
        if($(this).is(':checked')){
            $(this).val(1);
        }else{
            $(this).val(0);
        }
        console.log('val checkbiox ' + $(this).val());
    });

     $('.equipment_date').each(function(key, value){
        var value = $(this).val();
        var id = $(this).attr('name').split('_')[3];
        var value2 = $(this).parent().find('span').first().html(); // $('#equipment_date_dernier_audit').html();
        $(this).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy"
        });
        $(this).datepicker('setDate', value2);
    });



    var equipmentId = parseInt($('#id').val());
    if(equipmentId == 0){ //creation
        if($('#an_mise_service').val() == ''){
            var now = new Date();
            var month = now.getMonth() + 1;
            if(month < 10) month = '0' + month;
            var day = now.getDate();
            if(day < 10) day = '0' + day;
            var date_suivant = day + '/' + month + '/' + now.getFullYear();
            $('#an_mise_service').val(date_suivant);
        }
    } else{ //edition

    }

    $('#date_dernier_audit').change(function(){
        updateNextAudit();
    });
    $('#category_id').change(function(){
        //mise à jour next audit uniquement si les deux checkbox ne sont pas cochés
        updateNextAudit();
        showField();
        var periode = $('#category_id').find('option:selected').data('periode');
        $('#periode').val(periode);
    });

    showField();
    /*$('input[name=periode_checkbox]').change(function(){
        var $box = $(this);
        if( $box.is(':checked') ){
            $('#periode').val($(this).val());
            var group = "input:checkbox[name='periode_checkbox']";
            $(group).prop("checked", false);
            $box.prop("checked", true);
        }else{
            var periode = $('#category_id').find('option:selected').data('periode');
            $('#periode').val(periode);
        }
        updateNextAudit();
    });*/

    //affectation de la périodicité
    if($('#id').val() == 0){ //form create

        /*$('input[name=periode_checkbox]').each(function(key, value){
            console.log('val checkbiox ' + $(this).val());
            if( $(this).is(':checked') ){
                $('#periode').val($(this).val());
            }
        });*/
        if($('#periode').val().length == 0){
            var periode = $('#category_id').find('option:selected').data('periode');
            $('#periode').val(periode);
        }
    }

    if($('#date_audit_suivant').length > 0){
        if($('#date_audit_suivant').val().length == 0){
            //affecte la date du prochain contrôle si elle est vide au chargement
            updateNextAudit();
        }
    }

    //showFieldForElingue();


    var imgSrc = $('#equipment_image_src').html();
    //console.log('image');
    //console.log(imgSrc);
    if(imgSrc){
        if(imgSrc.length > 0){
            //console.log('set image');
            $('#equipment_image_img').attr('src', imgSrc.replace(/amp;/g, ''));
            $('#equipment_image_img').show();
        }
    }

    $('#uploadPhoto').click(function(){
        $('#inputUploadPhoto').click();
    });
    $('#inputUploadPhoto').change(function(e){
        var fileName = e.target.files[0].name;
        $('#photo_name').html(fileName);
        $('#removePhoto').val(0);
        $('#uploadPhoto').find('span').html('Modifier la photo');
        $('#removePhotoBtn').show();
    });
    $('#removePhotoBtn').click(function(){
        $('#removePhoto').val(1);
        $('#inputUploadPhoto').val('');
        $('#uploadPhoto').find('span').html('Ajouter une photo');
        $('#equipment_image_img').attr('src', '');
        $('#removePhotoBtn').hide();
        $('#photo_name').html('');
    });


    $('#of_cap_levage').change(function(){
        if($(this).is( ':checked' )){
            //$('#orga_certif').val('Cap Levage');
            document.getElementById("orga_certif").value = "Cap Levage";
            //$('#orga_certif').attr('disabled', true);
            document.getElementById("orga_certif").disabled = true;
            document.getElementById('orga_certif').required = false;
        }else {
            //$('#orga_certif').val('');
            document.getElementById("orga_certif").value = "";
            //$('#orga_certif').attr('disabled', false);
            document.getElementById("orga_certif").disabled = false;
            document.getElementById('orga_certif').required = true;
        }
    });

    $('#filesToDelete').val(JSON.stringify([]));

    $('.remove_file_edit').click(function(){
        var id = $(this).attr('id').split('_')[2];
        idsToDelete.push(id);
        console.log(idsToDelete);
        $('#filesToDelete').val(idsToDelete);
        console.log($('#filesToDelete').val());
        //filesToDelete
        //$('#row_certificat_edit_' + id).hide('slow');//.remove();


        $('#row_certificat_edit_' + id).fadeOut('slow', function(){
          $(this).remove();
        });



    });

    $('.certificat_date_input_edit').each(function(key, value){
        var value = $(this).val();
        var id = $(this).attr('name').split('_')[3];
        console.log('value: ' + value);
        console.log('value: ' + value.substring(0, 10)+ '#');
        var value2 = $('#certificat_date_input_edit_value_' + id).html();
        console.log(value2);
        $(this).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy"
        });
        $(this).datepicker('setDate', value2);
    });


    /*var tableCertificats = $('#list_certificats').DataTable({
            "pageLength": 10,
            searching: false,
            "bLengthChange" : false,
            "language": {
                "url": "/certification/static/src/js/datatables/French.json"
            }
        });
        tableCertificats.on( 'draw', function () {
            $('#list_certificats').show();
            $('#list_certificats_wrapper').find('.row').removeClass('row').addClass('col-xs-12');
        } );*/

    var table = $('#list_certificats').DataTable({
		"pageLength": 10,
		searching: false,
		"bLengthChange" : false,
		"language": {
            "url": "/certification/static/src/js/datatables/French.json"
        }
	});
	table.on( 'draw', function () {
		$('#list_certificats').show();
		$('#list_certificats').parent().parent().addClass('col-xs-12');
        $('#list_certificats_info').parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#list_certificats_paginate').parent().parent().removeClass('col-sm-7').addClass('col-xs-12');
	} );
	var table2 = $('#list_travaux').DataTable({
        "pageLength": 10,
        searching: false,
        "bLengthChange" : false,
        "language": {
            "url": "/certification/static/src/js/datatables/French.json"
        }
    });
    table2.on( 'draw', function () {
        $('#list_travaux').show();
        $('#list_travaux').parent().parent().addClass('col-xs-12');
        $('#list_travaux_info').parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#list_travaux_paginate').parent().parent().removeClass('col-sm-7').addClass('col-xs-12');
    } );
    var table3 = $('#devis_en_cours').DataTable({
        "pageLength": 10,
        searching: false,
        "bLengthChange" : false,
        "language": {
            "url": "/certification/static/src/js/datatables/French.json"
        }
    });
    table3.on( 'draw', function () {
        $('#devis_en_cours').show();
        $('#devis_en_cours').parent().parent().addClass('col-xs-12');
        $('#devis_en_cours_info').parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#devis_en_cours_paginate').parent().parent().removeClass('col-sm-7').addClass('col-xs-12');
    } );

    var table4 = $('#list_rapports_vgp').DataTable({
        "pageLength": 10,
        searching: false,
        "bLengthChange" : false,
        "language": {
            "url": "/certification/static/src/js/datatables/French.json"
        }
    });
    table4.on( 'draw', function () {
        $('#list_rapports_vgp').show();
        $('#list_rapports_vgp').parent().parent().addClass('col-xs-12');
        $('#list_rapports_vgp_info').parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#list_rapports_vgp_paginate').parent().parent().removeClass('col-sm-7').addClass('col-xs-12');
    } );



    $('.add_certificat_file_to_equipment').click(function(){
        var type = $(this).data('type');
        i++;

        /*$('#list_certificats').append($tmp);
        $tmp.find('input[name="certificat_orga_certif_"]').attr('name', $tmp.find('input[name="certificat_orga_certif_"]').attr('name') + i);
        $tmp.find('input[name="certificat_date_"]').attr('name', $tmp.find('input[name="certificat_date_"]').attr('name') + i);
        $tmp.find('input[name="certificat_attachment_"]').attr('name', $tmp.find('input[name="certificat_attachment_"]').attr('name') + i);
        $tmp.find('.remove_file').attr('id', 'remove_file_' + i);
        $('#remove_file_' + i).data('index', i);
*/
        //var $inputOrga = $('#tpl_add_certificat').find('input[name="certificat_orga_certif_"]').clone();
        var $inputDescription = $('#tpl_add_certificat').find('input[name="certificat_description_"]').clone();
        var $inputType = $('#tpl_add_certificat').find('input[name="certificat_type_"]').clone();
        //var $inputDate = $('#tpl_add_certificat').find('input[name="certificat_date_"]').clone();
        var $inputAttachment = $('#tpl_add_certificat').find('input[name="certificat_attachment_"]').clone();

        var $btnRemove = $('#tpl_add_certificat').find('.remove_file').clone();
        //$inputOrga.attr('name', 'certificat_orga_certif_' + i);
        $inputDescription.attr('name', 'certificat_description_' + i);
        $inputType.attr('name', 'certificat_type_' + i);
        $inputType.val(type);
        //$inputDate.attr('name', 'certificat_date_' + i);
        $inputAttachment.attr('name', 'certificat_attachment_' + i);
        $btnRemove.attr('id', 'remove_file_' + i);
        $btnRemove.data('index', i);


        var $tr = $('<tr></tr>');
        var $td = $('<td></td>');
        //$td.append($inputOrga);
        //$tr.append($td);
        $td.append($inputDescription);
        $td.append($inputType);
        $tr.append($td);
        //$td = $('<td></td>');
        //$td.append($inputDate);
        //$tr.append($td);
        $td = $('<td></td>');
        $td.append($inputAttachment);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($btnRemove);
        $tr.append($td);

        $('#list_certificats > tbody').append($tr);

        //$inputOrga.attr('id', 'certificat_orga_certif_' + i);
        $inputDescription.attr('id', 'certificat_description_' + i);
        $inputType.attr('id', 'certificat_type_' + i);
        //$inputDate.attr('id', 'certificat_date_' + i);
        $inputAttachment.attr('id', 'certificat_attachment_' + i);

        //document.getElementById('certificat_orga_certif_' + i).required = true;
        document.getElementById('certificat_description_' + i).required = true;
        document.getElementById('certificat_type_' + i).required = true;
        //document.getElementById('certificat_date_' + i).required = true;
        document.getElementById('certificat_attachment_' + i).required = true;

        /*$inputDate.datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy"
        });*/

        $btnRemove.click(function(){
            var index = $(this).data('index');
            $('#row_certificat_' + index).remove();

            i = 0;
            $.each($('#list_certificats').find('.row_certificat'), function(key, value){
                i++;
                $(this).attr('id', 'row_certificat_' + i);

                //$(this).find('.certificat_orga_certif_input').attr('name', 'certificat_orga_certif_' + i);
                $(this).find('.certificat_description_input').attr('name', 'certificat_description_' + i);
                $(this).find('.certificat_type_input').attr('name', 'certificat_type_' + i);
                //$(this).find('.certificat_date_input').attr('name', 'certificat_date_' + i);
                $(this).find('.certificat_attachment_input').attr('name', 'certificat_attachment_' + i);
                //$(this).find('.certificat_orga_certif_input').attr('id', 'certificat_orga_certif_' + i);
                $(this).find('.certificat_description_input').attr('id', 'certificat_description_' + i);
                $(this).find('.certificat_type_input').attr('id', 'certificat_type_' + i);
                //$(this).find('.certificat_date_input').attr('id', 'certificat_date_' + i);
                $(this).find('.certificat_attachment_input').attr('id', 'certificat_attachment_' + i);
                $(this).find('.remove_file').attr('id', 'remove_file_' + i);
                $(this).find('.remove_file').data('index', i);

                //loadDatePicker($('#certificat_date_' + i));
            });


            //certificat_orga_certif_label
            //certificat_orga_certif_input
            //certificat_date_label
            //certificat_date_input
            //certificat_attachment_input
        });

        $tr.attr('id', 'row_certificat_' + i);
        $tr.addClass('row_certificat');
        //$tmp.show();
        return false;

    });


    if($('#contentAction').length > 0){
        setTimeout(function(){
            $('#list_certificats_info').parent().parent().prepend($('#contentAction'));
        $('#contentAction').show();
         }, 3000);


    }


});