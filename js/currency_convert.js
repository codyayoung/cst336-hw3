var base = "USD";

// On window load, populates currency select menus 
$(document).ready(function(){
    $.ajax({
        method: "GET",
            url: "https://api.exchangeratesapi.io/latest?" + "base=" + base,
        dataType: "json",
            data: {"rates": $('#rates').val() },
    
        success: function(result) {
            $.each(result.rates, function(country, rate) {      //
                console.log(country);
                console.log(rate);
                $("#fromCurrencySelect").append("<option value='"+ rate +"'>" + country + "</option>");
                $("#toCurrencySelect").append("<option value='"+ rate +"'>" + country + "</option>");
            });
        }
    }); 
});

// Changes base rates based on user selection 

