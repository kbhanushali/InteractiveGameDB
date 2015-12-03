$(document).ready(function () {

	checkLoggedIn();
});


function checkLoggedIn() {
	if(localStorage.loggedin == 'josh') {
		$('#logindiv').hide(); 
    	$('#profilediv').show();
	}
	
}

function login(){
    if(typeof(Storage) !== "undefined") {
        localStorage.setItem("loggedin", "josh");
    } else {
        // Sorry! No Web Storage support..
    }
    $('#logindiv').hide(); 
    $('#profilediv').show();
}