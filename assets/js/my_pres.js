	function expand(id){
		if ($('#inner_row_'+id).css('display') == 'none') {		
			$("#inner_row_"+id).show("slow");
			$("#"+id).attr("class", "open");
		} else {
			$("#inner_row_"+id).hide("slow");
			$("#"+id).attr("class", "close");
		}	
		//alert(id);
		//$("#inner_row_"+id).slideToggle();
	}
	function onEdit(id){
		//alert(id);
		$("#"+id).editInPlace({
			callback: function(unused, enteredText) { return enteredText; },
			bg_over: "silver"
		});	
	}
	
	function chkMobile(num){
		//alert(num);
		var pat = /^\d{10}$/;
		if((!pat.test(num)) )
			return false;
		else 
			return true;
	}