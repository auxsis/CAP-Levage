
$( document ).ready(function() {

   $('.edit_client').find('.o_external_button').remove();

    var num_materiel = $( "input[name*='num_materiel']" ).val();
    if(num_materiel != undefined){
        if(num_materiel.indexOf('duplication_') != -1){
            $( "input[name*='num_materiel']" ).val('');
            $( "input[name*='num_materiel']" ).change();
        }
    }

});
