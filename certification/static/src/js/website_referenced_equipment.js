$( document ).ready(function() {


    $('header').hide();
    $('.container.mt16.o_portal').hide();
    $('footer').hide();

    console.log('iframe');

    console.log($('#iframe_referenced_equipment'));
    $('#iframe_referenced_equipment').css('background', 'red');
});