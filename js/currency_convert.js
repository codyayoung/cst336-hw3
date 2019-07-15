var base = "USD";

// On window load, populates currency select menus 
$(document).ready(function(){
    $.ajax({
        method: "GET",
            url: "https://api.exchangeratesapi.io/latest?" + "base=" + base,
        dataType: "json",
            data: {"rates": $('#rates').val() },
    
        success: function(result, status) {
            for (var i=0; i < result.length; i++) {
                $("#fromCurrencySelect").append("<option>" + result[i].rates + "</option>");
            }    
        }
    }); 
});