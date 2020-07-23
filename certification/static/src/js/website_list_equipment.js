function loadTable() {
    var table = $('#listEquipments').DataTable({
		"pageLength": 10,
		searching: false,
		"bLengthChange" : false,
		"language": {
            "url": "/certification/static/src/js/datatables/French.json"
        }
	});
	table.on( 'draw', function () {
		/*$('#myTable').show();
		$('#o_portal_navbar_content').find('.o_portal_search_panel').find('.input-group-prepend').css('float', 'left');
		$('#o_portal_navbar_content').find('.o_portal_search_panel').find('.form-control').removeClass('form-control').removeClass('form-control-sm').addClass('col-xs-6');
		$('#o_portal_navbar_content').find('.o_portal_search_panel').find('.input-group-append').css('float', 'left');
        $('#myTable_paginate').parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#myTable_paginate').parent().parent().removeClass('col-sm-7').addClass('col-xs-12');
        */

		$('#myTable').parent().parent().addClass('col-xs-12');
        var $div = $('<div class="col-xs-12"></div>');
        $('#myTable_wrapper').append($div);

        var $divInfo = $('<div class="col-sm-5"></div>');
        $divInfo.append($('#myTable_info'));
        var $divPaginate = $('<div class="col-sm-7"></div>');
        $divPaginate.append($('#myTable_paginate'));
        $div.append($divInfo);
        $div.append($divPaginate);
	} );
}


$( document ).ready(function() {


    $.get("/get/my/materiels", function(data, status){
        console.log(data);
    });



});