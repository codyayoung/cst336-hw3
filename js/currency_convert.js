var base = "USD";

// On window load, populates currency select menus 
$(document).ready(function(){
    $.ajax({
        method: "GET",
            url: "https://api.exchangeratesapi.io/latest?" + "base=" + base,
        dataType: "json",
            data: {"rates": $('#rates').val() },
    
        success: function(result, status) {
            //console.log(result.rates);
            for (var i=0; i < result.rates.length; i++) {
                console.log("loading currencies...");
                $("#fromCurrencySelect").append("<option>" + result.rates[i] + "</option>");
            }    
        }
    }); 
});