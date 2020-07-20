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


function addEventEquipeAndAgence(parent){
    var $btnAddEquipe = parent ? $(parent).find('.btnAddEquipe') : $('.btnAddEquipe');
    var $btnCancelEquipe = parent ? $(parent).find('.btnCancelEquipe') : $('.btnCancelEquipe');
    var $btnAddAgence = parent ? $(parent).find('.btnAddAgence') : $('.btnAddAgence');
    var $btnCancelAgence = parent ? $(parent).find('.btnCancelAgence') : $('.btnCancelAgence');
    $btnAddEquipe.click(function(){
	    console.log('add equipe');
        $(this).parent().find('.btnCancelEquipe').removeClass('hidden').show();
        $(this).parent().find('.equipeContent2').removeClass('hidden').show();
        $(this).parent().find('.btnAddEquipe').hide();
        $(this).parent().find('.equipeContent').hide();
        $(this).parent().find('input').val('');
	});
	$btnCancelEquipe.click(function(){
        $(this).parent().find('.btnAddEquipe').show();
        $(this).parent().find('.equipeContent').show();
        $(this).parent().find('.btnCancelEquipe').hide();
        $(this).parent().find('.equipeContent2').hide();
        $(this).parent().find('input').val('');
	});

	$btnAddAgence.click(function(){
        $(this).parent().find('.btnCancelAgence').removeClass('hidden').show();
        $(this).parent().find('.agenceContent2').removeClass('hidden').show();
        $(this).parent().find('.btnAddAgence').hide();
        $(this).parent().find('.agenceContent').hide();
        $(this).parent().find('input').val('');
	});
	$btnCancelAgence.click(function(){
        $(this).parent().find('.btnAddAgence').show();
        $(this).parent().find('.agenceContent').show();
        $(this).parent().find('.btnCancelAgence').hide();
        $(this).parent().find('.agenceContent2').hide();
        $(this).parent().find('input').val('');
	});
}
var i = 0;
$( document ).ready(function() {

    console.log('document ready');
/*
     var $iFrame = $('iframe_referenced_equipment');

    $iFrame.load(function(){
        console.log('done');
      $('#referenced_equipment').css('background', 'yellow');
    });*/

	/*$.each($('.equipment_image_src'), function(key, value){
		var src = $(this).html();
		if(src){
			if(src.length > 0){
				$(this).parent().find('.equipment_image_img').attr('src', src.replace(/amp;/g, ''));
				$(this).parent().find('.equipment_image_img').show();
			}
		}
	});*/


    addEventEquipeAndAgence();

    $('.inputDate').each(function (index, value) {
        var value = $(this).val();
        //console.log('value: ' + value);
        //console.log('value: ' + value.substring(0, 10)+ '#');
        var parts = value.split('-');
        $(this).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy"
        });
        if(parts.length == 3){
            $(this).datepicker('setDate', parts[2] + '/' + parts[1] + '/' + parts[0]);
        }


        //loadDatePicker($(this));
    });

    $('#filter').click(function(){

        var start = $('#date_start').val();
        var end = $('#date_end').val();
        var referent = $('#referent').val();
        var agence = $('#agence').val();
        var equipe = $('#equipe').val();
        var search = "";
        //2019-12-09
        var partsStart = start.split('/');
        var partsEnd = end.split('/');
        if(partsStart.length == 3 && partsEnd.length == 3){
            var dateStart = partsStart[2] + '-' + partsStart[1] + '-' + partsStart[0];
            var dateEnd = partsEnd[2] + '-' + partsEnd[1] + '-' + partsEnd[0];
            search += 'date_start=' + dateStart + '&date_end=' + dateEnd;
            //console.log('/my/planification?date_start=' + dateStart + '&date_end=' + dateEnd);
            //$('#exportTable').DataTable().destroy();
            //window.location = '/my/planification?date_start=' + dateStart + '&date_end=' + dateEnd;
            //return false;
        }
        if (referent.length > 0) {
            if (search.length > 0) {
                search += '&referent=' + referent;
            }
            else {
                search += 'referent=' + referent;
            }
        }
        if (agence.length > 0) {
            if (search.length > 0) {
                search += '&agence=' + agence;
            }
            else {
                search += 'agence=' + agence;
            }
        }
        if (equipe.length > 0) {
            if (search.length > 0) {
                search += '&equipe=' + equipe;
            }
            else {
                search += 'equipe=' + equipe;
            }
        }
        //if (search.length > 0){
            console.log('/my/planification?' + search);
            window.location = '/my/planification?' + search;
        //}
        //var mydate = new Date(parts[2], parts[1] -1, parts[0]);
        //console.log(mydate.toDateString());

    });
    $('#clear_filter').click(function(){
        //$('#exportTable').DataTable().destroy();
        window.location = '/my/planification';
    });


    var table = $('#exportTable').DataTable({
        "pageLength": 10,
		searching: false,
        "bLengthChange" : false,
        dom: 'Bfrtip',
        buttons: [{
            //'pdf',
            "extend": 'pdfHtml5',
            "orientation": 'portrait', //'landscape',
            "pageSize": 'LEGAL',
            "title": "Liste matériels",
            "customize": function(doc){
                styles: {
                    tableHeader:{
                        fillColor:"#A440A4"
                    }
                }
                console.log(doc);
                console.log(doc.content);
                console.log(doc.content[1]);
                console.log(doc.content[1].table.body);


                    //pour chaque ligne (après le l'entête
                    for(var i = 1 ; i < (doc.content[1].table.body.length) ; i++){

                        doc.content[1].table.body[i][0].alignment = 'center';
                        doc.content[1].table.body[i][1].alignment = 'center';
                        doc.content[1].table.body[i][2].alignment = 'center';
                        doc.content[1].table.body[i][3].alignment = 'center';
                        doc.content[1].table.body[i][4].alignment = 'center';
                        doc.content[1].table.body[i][5].alignment = 'center';
                        //doc.content[1].table.body[i][6].alignment = 'center';
                       //doc.content[1].table.body[i][7].alignment = 'center';

                        //Pour le numéro de matériel
                        var nummateriel = doc.content[1].table.body[i][0].text;
                        nummateriel = nummateriel.substr(nummateriel.indexOf('">') + 2, nummateriel.length);
                        console.log("#" + nummateriel + "#");
                        doc.content[1].table.body[i][0].text = nummateriel.replace('</a>', '');

                        //pour la photo
                        var tmptext = doc.content[1].table.body[i][2].text;
                        console.log('text: ' + tmptext);
                        var $img = $(tmptext);
                        var datas = $img.attr('src');
                        //tmptext = tmptext.replace(' class="zoom"', '');
                        //tmptext = tmptext.substring(10, tmptext.indexOf("height=") - 2);
                        //tmptext = 'http://image.jeuxvideo.com/medias-md/156916/1569155082-4033-card.jpg';
                        if(datas){
                            console.log('IMAGE');
                            console.log(datas.replace('image/png', 'image/jpeg'));
                            doc.content[1].table.body[i][2] = {
                                margin: [0, 0, 0, 12],
                                alignment: 'center',
                                style: 'tableBodyOdd',
                                //image: 'http://image.jeuxvideo.com/medias-md/156916/1569155082-4033-card.jpg',
                                //image: tmptext,
                                image: $img.attr('src').replace('image/png', 'image/jpeg'),
                                width: 70,
                                height: 65
                            };
                        }else{
                            //doc.content[1].table.body[i][0].text = '';
                            doc.content[1].table.body[i][2] = {
                                margin: [0, 0, 0, 12],
                                alignment: 'center',
                                style: 'tableBodyOdd',
                                //image: 'http://image.jeuxvideo.com/medias-md/156916/1569155082-4033-card.jpg',
                                //image: tmptext,
                                image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
                                width: 70,
                                height: 65
                            };
                        }

                        //Pour l'état
                        /*var etat = doc.content[1].table.body[i][6].text.substring(37, doc.content[1].table.body[i][6].text.length - 9);
                        console.log('etat');
                        console.log(etat);
                        switch(etat){
                            case 'ok':
                                etat = 'OK';
                                break;
                            case 'en_cours':
                                etat = 'En Cours';
                                break;
                            case 'bloque':
                                etat = 'Bloqué';
                                break;
                            case 'reforme':
                                etat = 'Réformé';
                                break;
                        }
                        doc.content[1].table.body[i][6].text = etat;*/


                        //Pour le devis en cours
                        //var devisEncours = doc.content[1].table.body[i][7].text;
                        //devisEncours = devisEncours.replace('<a href="/my/quotes" class="btn btn-default">Devis en cours <span style="color:red;">', '');
                        //devisEncours = devisEncours.replace('</span></a>', '');
                        //doc.content[1].table.body[i][7].text = devisEncours;
                    }



                     console.log('####body');
                     console.log(doc.content[1].table.body);
                return false;
            },
            exportOptions : {
                stripHtml : false,
                columns: [0, 1, 2, 3, 4, 5], //, 6, 8],
                dataPostProcess : function(dt, str)  {
                    console.log('preparing data');
                    if (str.body.length)
                        str.body = prepareTableData(str.body);
                    if (str.header.length)
                        str.header = prepareTableData(str.header);
                    return str;
                }
            }
        }],
        "searching": false,
        "language": {
            "url": "/certification/static/src/js/datatables/French.json"
        }
        /*"language": {
            "info": "_PAGE_ sur _PAGES_ pages",
            "paginate": {
              "first": "Première page",
                "last": "Dernière page",
                "next": "Suivante",
                "previous": "Précédente",
                "first":    '«',
                "previous": '‹',
                "next":     '›',
                "last":     '»'
            }
          }*/
    });
    table.on( 'draw', function () {
		$('#exportTable').show();

        var $div = $('<div class="col-xs-12"></div>');
        $('#exportTable_wrapper').append($div);

        var $divInfo = $('<div class="col-sm-5"></div>');
        $divInfo.append($('#exportTable_info'));
        var $divPaginate = $('<div class="col-sm-7"></div>');
        $divPaginate.append($('#exportTable_paginate'));
        $div.append($divInfo);
        $div.append($divPaginate);

	} );
    /*table.buttons.exportData({
        stripHtml: false
        });*/


    var table = $('#listReferents').DataTable({
		"pageLength": 10,
		searching: false,
		"bLengthChange" : false,
		"language": {
            "url": "/certification/static/src/js/datatables/French.json"
        }
	});
	table.on( 'draw', function () {
		$('#listReferents').show();
		$('#listReferents').parent().parent().addClass('col-xs-12');
        $('#listReferents_info').parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#listReferents_paginate').parent().parent().removeClass('col-sm-7').addClass('col-xs-12');
	} );

	var table = $('#listEquipes').DataTable({
		"pageLength": 10,
		searching: false,
		"bLengthChange" : false,
		"language": {
            "url": "/certification/static/src/js/datatables/French.json"
        }
	});
	table.on( 'draw', function () {
		$('#listEquipes').show();
		$('#listEquipes').parent().parent().addClass('col-xs-12');
        $('#listEquipes_info').parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#listEquipes_paginate').parent().parent().removeClass('col-sm-7').addClass('col-xs-12');
	} );

	var table = $('#listAgences').DataTable({
		"pageLength": 10,
		searching: false,
		"bLengthChange" : false,
		"language": {
            "url": "/certification/static/src/js/datatables/French.json"
        }
	});
	table.on( 'draw', function () {
		$('#listAgences').show();
		$('#listAgences').parent().parent().addClass('col-xs-12');
        $('#listAgences_info').parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#listAgences_paginate').parent().parent().removeClass('col-sm-7').addClass('col-xs-12');
	} );


    function createPDF() {
        // Get the element.
        var element = document.getElementById('templatePdfContent');
        //$(element).show();
        // Choose pagebreak options based on mode.
        var mode = 'css';
        var pagebreak = (mode === 'specify') ?
            { mode: '', before: '.before', after: '.after', avoid: '.avoid' } :
            { mode: mode };

        // Generate the PDF.
        html2pdf().from(element).set({
          filename: 'liste_materiels.pdf',
          pagebreak: pagebreak,
		  image:        { type: 'jpeg', quality: 0.98 },
		  html2canvas:  { scale: 2 },
          jsPDF: {orientation: 'landscape', unit: 'in', format: 'letter', compressPDF: false}
        }).save();
        //setTimeout(function(){ $(element).hide(); }, 100);

    }

    $('.buttons-pdf').hide();
    $("#exportButton").click(function () {
        //$('.buttons-pdf').click();
            createPDF();

    });

    var imgSrc = $('#partner_image_src').html();
    if(imgSrc){
        if(imgSrc.length > 0){
            console.log('set image');
            $('#partner_image_img').attr('src', imgSrc.replace(/amp;/g, ''));
            $('#partner_image_img').show();
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

        var file = document.getElementById('inputUploadPhoto').files[0];
        var reader  = new FileReader();
        reader.addEventListener("load", function () {
            $('#partner_image_img').attr('src', reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    });
    $('#removePhotoBtn').click(function(){
        $('#removePhoto').val(1);
        $('#inputUploadPhoto').val('');
        $('#uploadPhoto').find('span').html('Ajouter une photo');
        $('#partner_image_img').attr('src', '');
        $('#removePhotoBtn').hide();
        $('#photo_name').html('');
    });


    $('#referentsToDelete').val(JSON.stringify([]));
    $('#equipesToDelete').val(JSON.stringify([]));
    $('#agencesToDelete').val(JSON.stringify([]));

    var idsReferentsToDelete = [];
    $('.remove_referent_edit').click(function(){
        var id = $(this).attr('id').split('_')[2];
        idsReferentsToDelete.push(id);
        console.log(idsReferentsToDelete);
        $('#referentsToDelete').val(idsReferentsToDelete);
        console.log($('#referentsToDelete').val());

        $('#row_referent_edit_' + id).fadeOut('slow', function(){
          $(this).remove();
        });
    });

    var idsEquipesToDelete = [];
    $('.remove_equipe_edit').click(function(){
        var id = $(this).attr('id').split('_')[2];
        idsEquipesToDelete.push(id);
        console.log(idsEquipesToDelete);
        $('#equipesToDelete').val(idsEquipesToDelete);
        console.log($('#equipesToDelete').val());

        $('#row_equipe_edit_' + id).fadeOut('slow', function(){
          $(this).remove();
        });

        $("#form_equipes").submit();
        return false;
    });

    var idsAgencesToDelete = [];
    $('.remove_agence_edit').click(function(){
        var id = $(this).attr('id').split('_')[2];
        idsAgencesToDelete.push(id);
        console.log(idsAgencesToDelete);
        $('#agencesToDelete').val(idsAgencesToDelete);
        console.log($('#agencesToDelete').val());

        $('#row_agence_edit_' + id).fadeOut('slow', function(){
          $(this).remove();
        });
        $("#form_agences").submit();
        return false;
    });

    $('#addReferent').click(function(){
        i++;


        var $inputName = $('#tpl_add_referent').find('input[name="referent_name_"]').clone();
        //var $inputLastName = $('#tpl_add_referent').find('input[name="referent_last_name_"]').clone();
        //var $inputFirstName = $('#tpl_add_referent').find('input[name="referent_first_name_"]').clone();
        var $inputFunction = $('#tpl_add_referent').find('input[name="referent_function_"]').clone();
        var $inputEmail = $('#tpl_add_referent').find('input[name="referent_email_"]').clone();
        var $inputPhone = $('#tpl_add_referent').find('input[name="referent_phone_"]').clone();
        /*var $inputEquipe = $('#tpl_add_referent').find('input[name="referent_equipe_"]').clone();
        var $inputAgence = $('#tpl_add_referent').find('input[name="referent_agence_"]').clone();*/
        var $contentEquipe = $('#tpl_add_referent').find('.contentAddReferentEquipe').clone();
        var $contentAgence = $('#tpl_add_referent').find('.contentAddReferentAgence').clone();

        var $btnRemove = $('#tpl_add_referent').find('.remove_referent').clone();
        var $btnSave = $('#tpl_add_referent').find('.save_referent').clone();
        //$inputOrga.attr('name', 'certificat_orga_certif_' + i);
        $inputName.attr('name', 'referent_name_' + i);
        //$inputLastName.attr('name', 'referent_last_name_' + i);
        //$inputFirstName.attr('name', 'referent_first_name_' + i);
        $inputFunction.attr('name', 'referent_function_' + i);
        $inputEmail.attr('name', 'referent_email_' + i);
        $inputPhone.attr('name', 'referent_phone_' + i);
        $contentEquipe.find('select').attr('name', 'referent_equipe_id_' + i);
        $contentEquipe.find('input').attr('name', 'referent_equipe_' + i);
        $contentAgence.find('select').attr('name', 'referent_agence_id_' + i);
        $contentAgence.find('input').attr('name', 'referent_agence_' + i);





        $btnRemove.attr('id', 'remove_referent_' + i);
        $btnRemove.data('index', i);
        $btnSave.attr('id', 'save_referent_' + i);
        $btnSave.data('index', i);


        var $tr = $('<tr></tr>');
        var $td = $('<td></td>');
        $td.append($inputName);
        //$td.append($inputLastName);
        $tr.append($td);
        //$td = $('<td></td>');
        //$td.append($inputFirstName);
        //$tr.append($td);
        $td = $('<td></td>');
        $td.append($inputFunction);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputEmail);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputPhone);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($contentEquipe);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($contentAgence);
        $tr.append($td);
        $td = $('<td></td>');
        $div = $('<div style="display: inline-flex;"></div>');
        $div.append($btnRemove);
        $div.append($btnSave);
        $td.append($div);
        $tr.append($td);

        $('#listReferents > tbody').append($tr);

        $inputName.attr('id', 'referent_name_' + i);
        //$inputLastName.attr('id', 'referent_last_name_' + i);
        //$inputFirstName.attr('id', 'referent_first_name_' + i);
        $inputFunction.attr('id', 'referent_function_' + i);
        $inputEmail.attr('id', 'referent_email_' + i);
        $inputPhone.attr('id', 'referent_phone_' + i);
        $contentEquipe.find('select').attr('id', 'referent_equipe_id_' + i);
        $contentEquipe.find('input').attr('id', 'referent_equipe_' + i);
        $contentAgence.find('select').attr('id', 'referent_agence_id_' + i);
        $contentAgence.find('input').attr('id', 'referent_agence_' + i);

        document.getElementById('referent_name_' + i).required = true;
        //document.getElementById('referent_last_name_' + i).required = true;
        //document.getElementById('referent_first_name_' + i).required = true;
        document.getElementById('referent_email_' + i).required = true;
        document.getElementById('referent_phone_' + i).required = true;


        $btnRemove.click(function(){
            var index = $(this).data('index');
            $('#row_referent_' + index).remove();

            i = 0;
            $.each($('#listReferents').find('.row_referent'), function(key, value){
                i++;
                $(this).attr('id', 'row_referent_' + i);

                $(this).find('.referent_name_input').attr('name', 'referent_name_' + i);
                //$(this).find('.referent_last_name_input').attr('name', 'referent_last_name_' + i);
                //$(this).find('.referent_first_name_input').attr('name', 'referent_first_name_' + i);
                $(this).find('.referent_function_input').attr('name', 'referent_function_' + i);
                $(this).find('.referent_email_input').attr('name', 'referent_email_' + i);
                $(this).find('.referent_phone_input').attr('name', 'referent_phone_' + i);
                $(this).find('.referent_equipe_select').attr('name', 'referent_equipe_id_' + i);
                $(this).find('.referent_equipe_input').attr('name', 'referent_equipe_' + i);
                $(this).find('.referent_agence_select').attr('name', 'referent_agence_id_' + i);
                $(this).find('.referent_agence_input').attr('name', 'referent_agence_' + i);
                $(this).find('.referent_name_input').attr('id', 'referent_name_' + i);
                //$(this).find('.referent_last_name_input').attr('id', 'referent_last_name_' + i);
                //$(this).find('.referent_first_name_input').attr('id', 'referent_first_name_' + i);
                $(this).find('.referent_function_input').attr('id', 'referent_function_' + i);
                $(this).find('.referent_email_input').attr('id', 'referent_email_' + i);
                $(this).find('.referent_phone_input').attr('id', 'referent_phone_' + i);
                $(this).find('.referent_equipe_select').attr('id', 'referent_equipe_id_' + i);
                $(this).find('.referent_equipe_input').attr('id', 'referent_equipe_' + i);
                $(this).find('.referent_agence_select').attr('id', 'referent_agence_id_' + i);
                $(this).find('.referent_agence_input').attr('id', 'referent_agence_' + i);

                $(this).find('.remove_referent').attr('id', 'remove_referent_' + i);
                $(this).find('.save_referent').attr('id', 'save_referent_' + i);
                $(this).find('.remove_referent').data('index', i);
                $(this).find('.save_referent').data('index', i);
            });
        });

        addEventEquipeAndAgence($contentEquipe);
        addEventEquipeAndAgence($contentAgence);

        $tr.attr('id', 'row_referent_' + i);
        $tr.addClass('row_referent');
        //$tmp.show();
        return false;

    });

    $('#addEquipe').click(function(){
        i++;


        var $inputName = $('#tpl_add_equipe').find('input[name="equipe_name_"]').clone();
        var $inputFunction = $('#tpl_add_equipe').find('input[name="equipe_function_"]').clone();
        var $inputEmail = $('#tpl_add_equipe').find('input[name="equipe_email_"]').clone();
        var $inputPhone = $('#tpl_add_equipe').find('input[name="equipe_phone_"]').clone();
        var $inputMobile = $('#tpl_add_equipe').find('input[name="equipe_mobile_"]').clone();

        var $btnRemove = $('#tpl_add_equipe').find('.remove_equipe').clone();
        var $btnSave = $('#tpl_add_equipe').find('.save_equipe').clone();
        $inputName.attr('name', 'equipe_name_' + i);
        $inputFunction.attr('name', 'equipe_function_' + i);
        $inputEmail.attr('name', 'equipe_email_' + i);
        $inputPhone.attr('name', 'equipe_phone_' + i);
        $inputMobile.attr('name', 'equipe_mobile_' + i);

        $btnRemove.attr('id', 'remove_equipe_' + i);
        $btnRemove.data('index', i);
        $btnSave.attr('id', 'save_equipe_' + i);
        $btnSave.data('index', i);


        var $tr = $('<tr></tr>');
        var $td = $('<td></td>');
        $td.append($inputName);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputFunction);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputEmail);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputPhone);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputMobile);
        $tr.append($td);
        $td = $('<td></td>');
        $div = $('<div style="display: inline-flex;"></div>');
        $div.append($btnRemove);
        $div.append($btnSave);
        $td.append($div);
        $tr.append($td);

        $('#listEquipes > tbody').append($tr);

        $inputName.attr('id', 'equipe_name_' + i);
        $inputFunction.attr('id', 'equipe_function_' + i);
        $inputEmail.attr('id', 'equipe_email_' + i);
        $inputPhone.attr('id', 'equipe_phone_' + i);
        $inputMobile.attr('id', 'equipe_mobile_' + i);


        document.getElementById('equipe_name_' + i).required = true;
        //document.getElementById('equipe_email_' + i).required = true;
        //document.getElementById('equipe_phone_' + i).required = true;
        //document.getElementById('referent_mobile_' + i).required = true;


        $btnRemove.click(function(){
            var index = $(this).data('index');
            $('#row_equipe_' + index).remove();

            i = 0;
            $.each($('#listEquipes').find('.row_equipe'), function(key, value){
                i++;
                $(this).attr('id', 'row_equipe_' + i);

                $(this).find('.equipe_name_input').attr('name', 'equipe_name_' + i);
                $(this).find('.equipe_function_input').attr('name', 'referent_function_' + i);
                $(this).find('.equipe_email_input').attr('name', 'equipe_email_' + i);
                $(this).find('.equipe_phone_input').attr('name', 'equipe_phone_' + i);
                $(this).find('.equipe_mobile_input').attr('name', 'equipe_mobile_' + i);

                $(this).find('.equipe_name_input').attr('id', 'equipe_name_' + i);
                $(this).find('.equipe_function_input').attr('id', 'equipe_function_' + i);
                $(this).find('.equipe_email_input').attr('id', 'equipe_email_' + i);
                $(this).find('.equipe_phone_input').attr('id', 'equipe_phone_' + i);
                $(this).find('.equipe_mobile_input').attr('id', 'equipe_mobile_' + i);

                $(this).find('.remove_equipe').attr('id', 'remove_equipe_' + i);
                $(this).find('.save_equipe').attr('id', 'save_equipe_' + i);
                $(this).find('.remove_equipe').data('index', i);
                $(this).find('.save_equipe').data('index', i);
            });
        });

        $tr.attr('id', 'row_equipe_' + i);
        $tr.addClass('row_equipe');
        //$tmp.show();
        return false;

    });

    $('#addAgence').click(function(){
        i++;


        var $inputName = $('#tpl_add_agence').find('input[name="agence_name_"]').clone();
        var $inputEmail = $('#tpl_add_agence').find('input[name="agence_email_"]').clone();
        var $inputPhone = $('#tpl_add_agence').find('input[name="agence_phone_"]').clone();
        var $inputMobile = $('#tpl_add_agence').find('input[name="agence_mobile_"]').clone();
        var $inputStreet = $('#tpl_add_agence').find('input[name="agence_street_"]').clone();
        var $inputZip = $('#tpl_add_agence').find('input[name="agence_zip_"]').clone();
        var $inputCity = $('#tpl_add_agence').find('input[name="agence_city_"]').clone();

        var $btnRemove = $('#tpl_add_agence').find('.remove_agence').clone();
        var $btnSave = $('#tpl_add_agence').find('.save_agence').clone();
        $inputName.attr('name', 'agence_name_' + i);
        $inputEmail.attr('name', 'agence_email_' + i);
        $inputPhone.attr('name', 'agence_phone_' + i);
        $inputMobile.attr('name', 'agence_mobile_' + i);
        $inputStreet.attr('name', 'agence_street_' + i);
        $inputZip.attr('name', 'agence_zip_' + i);
        $inputCity.attr('name', 'agence_city_' + i);

        $btnRemove.attr('id', 'remove_agence_' + i);
        $btnRemove.data('index', i);
        $btnSave.attr('id', 'save_agence_' + i);
        $btnSave.data('index', i);


        var $tr = $('<tr></tr>');
        var $td = $('<td></td>');
        $td.append($inputName);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputEmail);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputPhone);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputMobile);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputStreet);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputZip);
        $tr.append($td);
        $td = $('<td></td>');
        $td.append($inputCity);
        $tr.append($td);
        $td = $('<td></td>');
        $div = $('<div style="display: inline-flex;"></div>');
        $div.append($btnRemove);
        $div.append($btnSave);
        $td.append($div);
        $tr.append($td);

        $('#listAgences > tbody').append($tr);

        $inputName.attr('id', 'agence_name_' + i);
        $inputEmail.attr('id', 'agence_email_' + i);
        $inputPhone.attr('id', 'agence_phone_' + i);
        $inputMobile.attr('id', 'agence_mobile_' + i);
        $inputStreet.attr('id', 'agence_street_' + i);
        $inputZip.attr('id', 'agence_zip_' + i);
        $inputCity.attr('id', 'agence_city_' + i);

        document.getElementById('agence_name_' + i).required = true;
        //document.getElementById('agence_email_' + i).required = true;
        //document.getElementById('agence_phone_' + i).required = true;
        //document.getElementById('referent_mobile_' + i).required = true;


        $btnRemove.click(function(){
            var index = $(this).data('index');
            $('#row_agence_' + index).remove();

            i = 0;
            $.each($('#listAgences').find('.row_agence'), function(key, value){
                i++;
                $(this).attr('id', 'row_agence_' + i);

                $(this).find('.agence_name_input').attr('name', 'agence_name_' + i);
                $(this).find('.agence_email_input').attr('name', 'agence_email_' + i);
                $(this).find('.agence_phone_input').attr('name', 'agence_phone_' + i);
                $(this).find('.agence_mobile_input').attr('name', 'agence_mobile_' + i);
                $(this).find('.agence_street_input').attr('name', 'agence_street_' + i);
                $(this).find('.agence_zip_input').attr('name', 'agence_zip_' + i);
                $(this).find('.agence_city_input').attr('name', 'agence_city_' + i);

                $(this).find('.agence_name_input').attr('id', 'agence_name_' + i);
                $(this).find('.agence_email_input').attr('id', 'agence_email_' + i);
                $(this).find('.agence_phone_input').attr('id', 'agence_phone_' + i);
                $(this).find('.agence_mobile_input').attr('id', 'agence_mobile_' + i);
                $(this).find('.agence_street_input').attr('id', 'agence_street_' + i);
                $(this).find('.agence_zip_input').attr('id', 'agence_zip_' + i);
                $(this).find('.agence_city_input').attr('id', 'agence_city_' + i);

                $(this).find('.remove_agence').attr('id', 'remove_agence_' + i);
                $(this).find('.save_agence').attr('id', 'save_agence_' + i);
                $(this).find('.remove_agence').data('index', i);
                $(this).find('.save_agence').data('index', i);
            });
        });

        $tr.attr('id', 'row_agence_' + i);
        $tr.addClass('row_agence');
        //$tmp.show();
        return false;

    });

});