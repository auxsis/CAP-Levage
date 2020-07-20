var socket = new WebSocket('ws://127.0.0.1:4004');

function displayMessage(str) {
	//document.getElementById("message_nfc").innerHTML = str;
}
var focused = true;

window.onfocus = function() {
    focused = true;
};

window.onblur = function() {
    focused = false;
};

displayMessage("Client WebSocket ready on 127.0.0.1:4004");

socket.onmessage = function(event) {
	displayMessage(`NFC UID received from server: ${event.data}`);

	console.log('NFC UID received from server: ' + event.data);
	if (focused)
	{
		var origin = $('#origin').val();
		//var url = '/my/identification?';
		var url = '/my/equipments/tracking?';
		if(origin == 'bo') url += 'origin=' + origin + '&';
		url+= 'search_nfc=' + event.data;
	 	window.location = url;
		//window.open('http://caplevage.critt-informatique.fr:8069/web#id=2&view_type=form&model=critt.equipment&menu_id=405&action=479', '_self' );
	}
};

socket.onclose = function(event) {
	if (event.wasClean) {
		displayMessage(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
	} else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
		displayMessage('[close] Connection died');
  }
};

socket.onerror = function(error) {
	displayMessage(`[error] ${error.message}`);
};