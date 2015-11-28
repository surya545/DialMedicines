function txtOnBlur(eid,efunc){
	var f = efunc;
	//alert(eid);
	window[f](eid);
}
/*
function chkMobile(eid){
	
	var pat = /^\d{10}$/;
	var TCode = $("#"+eid).val();
	if((!pat.test(TCode)) ){
		
		$("#er_mobile").text('Invalid Number.');
		focusID(eid);
	} else {
		$("#er_mobile").text(" ");
	}
}
*/
function focusID(eid){
	$('#'+eid).focus();
}

function chkPin(eid){
	var pat = /^\d{4}$/;
	var TCode = $("#"+eid).val();
	if((!pat.test(TCode)) ){		
		$("#er_pin").text('Should be 4 digit number.');
		focusID(eid);
	} else {
		$("#er_pin").text(" ");
	}
}

function clearAll(){
	$('input:text').each(function() {
		$(this).val('');
	});
}

