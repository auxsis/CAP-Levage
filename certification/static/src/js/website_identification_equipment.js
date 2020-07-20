(function($){

    'use strict';
    var $origin = '';
    $( document ).ready(function() {
        console.log('identification');
        var controls_to_plan = $('#controls_to_plan').DataTable({
            "pageLength": 10,
            searching: false,
            "bLengthChange" : false,
            "language": {
                "url": "/certification/static/src/js/datatables/French.json"
            }
        });
        controls_to_plan.on( 'draw', function () {
            $('#controls_to_plan').show();
            $('#controls_to_plan_wrapper').find('.row').removeClass('row').addClass('col-xs-12');
        } );

        var next_controls = $('#next_controls').DataTable({
            "pageLength": 10,
            searching: false,
            "bLengthChange" : false,
            "language": {
                "url": "/certification/static/src/js/datatables/French.json"
            }
        });
        next_controls.on( 'draw', function () {
            $('#next_controls').show();
            $('#next_controls_wrapper').find('.row').removeClass('row').addClass('col-xs-12');
        } );

        var tableDevis = $('#table_devis').DataTable({
            "pageLength": 10,
            searching: false,
            "bLengthChange" : false,
            "language": {
                "url": "/certification/static/src/js/datatables/French.json"
            }
        });
        tableDevis.on( 'draw', function () {
            $('#table_devis').show();
            $('#table_devis_wrapper').find('.row').removeClass('row').addClass('col-xs-12');
        } );

        $origin = $('#origin').val();
        $('#num_materiel').keyup(function(){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                var num_materiel = $('#num_materiel').val();
                //$('#form_identification').submit();
                var url = '/my/identification?';
                if($origin == 'bo') url += 'origin=' + $origin + '&';
                url+= 'search=' + num_materiel;
                window.location = url;
            }
        });

         $('.controls_to_plan_date').each(function(key, value){
            var text = $(this).html();
            console.log(text);

            var parts = text.split("/");
            var dt = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
            console.log(dt);

            if(dt instanceof Date && !isNaN(dt)){

                var now = new Date();
                var Difference_In_Time = dt.getTime() - now.getTime();
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                Difference_In_Days = Difference_In_Days < 0 ? 0 : Difference_In_Days;
                console.log('diff ' + Difference_In_Days);

                $(this).html((Math.floor(Difference_In_Days) > 1) ? (Math.floor(Difference_In_Days) + ' jours') : (Math.floor(Difference_In_Days) + ' jour'));
            }
        });

        if($origin == 'bo'){
            $('header').remove();
            $('.o_portal_submenu').remove();

            $('nav').html('');
            //$('nav').append($('#menu_backoffice').html().replace(/Ã©/g,'é'));

            //$('nav').prepend('<button class="fa fa-bars pull-right visible-xs-block o_mobile_menu_toggle" type="button"></button>');

            $('nav').load( '/certification/static/src/menu.html', function() {

            });
        }

    });

})(jQuery);
