var initial_base = "USD";

// On window load, populates currency select menus 
$(document).ready(function(){
    $.ajax({
        method: "GET",
            url: "https://api.exchangeratesapi.io/latest?" + "base=" + initial_base,
        dataType: "json",
            data: {"rates": $('#rates').val() },
    
        success: function(result) {
            $.each(result.rates, function(country, rate) {      // Get base currency rates and country codes
                //console.log(country);
                //console.log(rate);
                $("#fromCurrencySelect").append("<option value='"+ rate +"'>" + country + "</option>");
                $("#toCurrencySelect").append("<option value='"+ rate +"'>" + country + "</option>");
            });
        }
    }); 
});

$.getJSON(
    'https://api.exchangeratesapi.io/latest?base=USD',
    function(data) {
        // Check money.js has finished loading:
        if ( typeof fx !== "undefined" && fx.rates ) {
            fx.rates = data.rates;
            fx.base = data.base;
        } else {
            // If not, apply to fxSetup global:
            var fxSetup = {
                rates : data.rates,
                base : data.base
            }
        }
    }
);

// Updates exchange rates from API based on user selection
 $(document).on('change', '#fromCurrencySelect', function(){
    var fromRate = $("#fromCurrencySelect :selected").text();
    var toRate = $("#toCurrencySelect :selected").text();

    $.ajax({
        method: "GET",
            url: "https://api.exchangeratesapi.io/latest?" + "symbols=" + fromRate + ',' + toRate,
        datatype: "json",
            data: {"rates": $('#rates').val() },
        
        success: function(result) {
            $.each(result.rates, function(country, rate) {
                console.log(country);
                console.log(rate);
            });
        }

    });


 });

 $(document).on('change', '#toCurrencySelect', function(){
    var fromRate = $("#fromCurrencySelect :selected").text();
    var toRate = $("#toCurrencySelect :selected").text();

    $.ajax({
        method: "GET",
            url: "https://api.exchangeratesapi.io/latest?" + "symbols=" + fromRate + ',' + toRate,
        datatype: "json",
            data: {"rates": $('#rates').val() },
        
        success: function(result) {
            $.each(result.rates, function(country, rate) {
                console.log(country);
                console.log(rate);
            });
        }

    });
 });

 $(document).on('click', '#currencySubmitBtn', function() {
     //Testing money.js
     var money = fx(1000).convert({from:"USD", to:"GBP"});
     console.log(money);
 });

