(function($){

    'use strict';
    function dateToString(date, format='dd-mm-yyyy'){
    //%d/%m/%Y %H:%M:%S
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var m = date.getMonth() + 1;
        var month = m < 10 ? '0' + m : m;
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

        var result = format
            .replace('dd', day)
            .replace('mm', month)
            .replace('yyyy', date.getFullYear())
            .replace('h', hours)
            .replace('m', minutes)
            .replace('s', seconds);


        return result;
    }


    function addOrUpdateAudit(arg, objAdd, calendar){
        var client_id;
        var planification_id = -1;
        console.log('addOrUpdate');
        console.log(objAdd);
        if(objAdd){

            client_id = objAdd.client_id;
        }else{
            planification_id = arg.event._def.extendedProps.planification_id
            client_id = arg.event._def.extendedProps.client_id;
        }

        var start = arg.event._instance.range.start;
            //start.setHours(start.getHours() - 2); //soustraire 2 heures, l'heure retourner par le calendrier est en avance
            start = dateToString(start, 'yyyy-mm-dd h:m:s');
        var end = arg.event._instance.range.end;
            //end.setHours(end.getHours() - 2); //soustraire 2 heures, l'heure retourner par le calendrier est en avance
            end = dateToString(end, 'yyyy-mm-dd h:m:s');

        console.log('client_id: ' + client_id + ' start: ' + start + ' end: ' + end);
        console.log('planification_id: ' + planification_id);
//return false;
        if(objAdd){
            $.ajax({
                type: "POST",
                url: '/my/planning/addorupdate',
                data: {
                    'csrf_token': document.getElementById('csrf_token').value,
                    'origin': $origin,
                    'client_id': client_id,
                    'planification_id': -1,
                    'start': start,
                    'end': end
                },
                success: function (result) {
                    var obj = JSON.parse(result);
                    if(!obj.res){
                        console.log('remove event');
                        var lastEvent = calendar.getEvents()[calendar.getEvents().length - 1];
                        lastEvent.remove();
                        $('#message_modal').find('.modal-title').html('Planification - Erreur');
                        $('#message_modal').find('.modal-body').html(obj.error);
                        $('#message_modal').modal();
                    }else{
                        console.log(obj);
                        console.log(calendar);
                        console.log('get sources');
                        console.log(calendar.getEvents());

                        var lastEvent = calendar.getEvents()[calendar.getEvents().length - 1];
                        console.log(lastEvent);
                        console.log(obj.planification_id + ' ' + client_id);
                        //lastEvent._def.extendedProps.audit_id = obj.audit_id;
                        //lastEvent._def.extendedProps.num_materiel = num_materiel;

                        var extendedProps = {
                            id: obj.planification_id,
                            planification_id: obj.planification_id,
                            start: start,
                            end: end,
                            client_id: client_id,
                            client: obj.client_name
                        };
                        lastEvent._def.extendedProps = extendedProps;


                        console.log(start + ' ###' + end);
                        //lastEvent._def.start = start.replace(' ', 'T');
                        //lastEvent._def.end = end.replace(' ', 'T');
                         console.log(lastEvent);

                         console.log(lastEvent._def.defId);
                         console.log(lastEvent._instance.instanceId);
                         var event = calendar.getEventById(lastEvent._def.defId.toString());
                         console.log(event);
                         lastEvent.setExtendedProp( 'title', 'CLICKED!' );
                        lastEvent.setExtendedProp( 'planification_id', obj.planification_id );
                        lastEvent.setExtendedProp( 'client_id', client_id );

                         console.log('event to update');
                         console.log(lastEvent);
                    }


                }
            });
        }else{
             $.ajax({
                type: "POST",
                url: '/my/planning/addorupdate',
                data: {
                    'csrf_token': document.getElementById('csrf_token').value,
                    'origin': $origin,
                    'client_id': client_id,
                    'planification_id': planification_id,
                    'start': start,
                    'end': end
                },
                success: function (result) {
                    console.log(result);
                }
            });
        }

    }

   document.addEventListener('DOMContentLoaded', function() {
    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendarInteraction.Draggable;

    /* initialize the external events
    -----------------------------------------------------------------*/

    var containerEl = document.getElementById('external-events');
    if(containerEl){
        new Draggable(containerEl, {
          itemSelector: '.fc-event',
          eventData: function(eventEl) {
            return {
              title: eventEl.innerText.trim()
            }
          }
        });
    }

    /* initialize the calendar
    -----------------------------------------------------------------*/

    var clients = [];

    $('#clients').find('div').each(function(index, value){
        var obj = {};
        //{ id: '5', resourceId: 'f', start: '2019-08-07T00:30:00', end: '2019-08-07T02:30:00', title: 'event 5' }
        $(this).find('span').each(function(index, value){
            switch(index){
                case 0: //audit id
                    obj.id = $(this).html();
                    obj.planification_id = $(this).html();
                    break;
                case 1: //audit start
                    obj.start = $(this).html().replace(' ', 'T');
                    break;
                case 2: //audit end
                    obj.end = $(this).html().replace(' ', 'T');
                    break;
                case 3: //audit etat
                    obj.client_id = $(this).html();
                    break;
                case 4: //audit id
                    obj.client = $(this).html();
                    break;
            }
        });
        clients.push(obj);
    });
    console.log(clients);

    console.log('init calendar');
    var now = new Date();

    var calendarEl = document.getElementById('calendar');
    var calendar = new Calendar(calendarEl, {
        plugins: [ 'interaction', 'dayGrid', 'timeGrid'],
        now: dateToString(now, 'yyyy-mm-dd'), //'2019-08-07',
        editable: true, // enable draggable events
        droppable: true, // this allows things to be dropped onto the calendar
        aspectRatio: 1.8,
        scrollTime: '00:00', // undo default 6am scrollTime
        header: {
            left: 'today, prev,next',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth,listWeek' //right: 'dayGridDay,timeGridWeek,dayGridMonth,listWeek'
        },

        defaultView: 'timeGridDay',
        locale: 'fr',
        events: clients,
        /*events: [
            { id: '1', resourceId: 'b', start: '2019-08-07T02:00:00', end: '2019-08-07T07:00:00', title: 'event 1' },
            { id: '2', resourceId: 'c', start: '2019-08-07T05:00:00', end: '2019-08-07T22:00:00', title: 'event 2' },
            { id: '3', resourceId: 'd', start: '2019-08-06', end: '2019-08-08', title: 'event 3' },
            { id: '4', resourceId: 'e', start: '2019-08-07T03:00:00', end: '2019-08-07T08:00:00', title: 'event 4' },
            { id: '5', resourceId: 'f', start: '2019-08-07T00:30:00', end: '2019-08-07T02:30:00', title: 'event 5' }
        ],*/
        drop: function(arg) {
            console.log('drop date: ' + arg.dateStr)

            if (arg.resource) {
              console.log('drop resource: ' + arg.resource.id)
            }

            // is the "remove after drop" checkbox checked?
            //if (document.getElementById('drop-remove').checked) {
              // if so, remove the element from the "Draggable Events" list
              arg.draggedEl.parentNode.removeChild(arg.draggedEl);
            //}
        },
        eventReceive: function(arg) { // called when a proper external event is dropped
            console.log(arg);
            console.log(arg.draggedEl);
            var data = $(arg.draggedEl).data('event').replace(/'/g,'"'); //arg.draggedEl.dataset.event;
            data = JSON.parse(data);
            console.log('eventReceive', arg.event);
            //console.log(arg.event._def);
            //console.log(arg.event._instance);
            addOrUpdateAudit(arg, data, calendar);

        },
        eventResize: function(arg) {
            console.log('eventResize', arg.event);
            addOrUpdateAudit(arg, null, calendar);
        },
        eventDrop: function(arg) { // called when an event (already on the calendar) is moved
            console.log('eventDrop', arg.event);
            addOrUpdateAudit(arg, null, calendar);
        },
        eventClick: function(info) {
            console.log(info);


            //$('#modal_audit_num_materiel').html(info.event._def.extendedProps.num_materiel);
            //$('#modal_equipment_statut').html(info.event._def.extendedProps.statut_materiel_libelle);
            //$('#modal_equipment_statut').attr('class', 'equipment_statut');
            //$('#modal_equipment_statut').addClass(info.event._def.extendedProps.statut_materiel);
            $('#modal_planification_client').addClass(info.event._def.extendedProps.client);

            var start = info.event._instance.range.start;
            start.setHours(start.getHours() - 2);
            start = dateToString(start, 'dd/mm/yyyy h:m:s');
            $('#modal_planification_start').html(start);

            var end = info.event._instance.range.end;
            end.setHours(end.getHours() - 2);
            end = dateToString(end, 'dd/mm/yyyy h:m:s');
            $('#modal_planification_end').html(end);

            $('#planification_infos').modal();
            //alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            //alert('View: ' + info.view.type);

            // change the border color just for fun
            //info.el.style.borderColor = 'red';
        }
    });
    calendar.render();

  });


    var $origin = '';
    $( document ).ready(function() {

        $origin = $('#origin').val();
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