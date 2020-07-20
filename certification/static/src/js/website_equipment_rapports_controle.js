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
		$('#myTable').show();
		$('#myTable').parent().parent().addClass('col-xs-12');
        $('#myTable_info').parent().removeClass('col-sm-7').addClass('col-xs-12');
        $('#myTable_paginate').parent().parent().removeClass('col-sm-7').addClass('col-xs-12');
	} );

});