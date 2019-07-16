var initial_base = "USD";
var valid = true;

// On window load, populates currency select menus and gets current exchange rates
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

            var dt = new Date().toString();
             $("#timestamp").html(dt);
        }
    }); 

    $.getJSON(
        // Load exchange rate values 
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
        console.log("Rates loaded successfully.");
        }
    );
});

$(document).on('change', '#fromCurrInput', function(){
    if ($("#fromCurrInput").val().length > 0) {
        $("inputError").html("");
        valid = true;
    }
});

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
     
    if (!validParams()) {
        event.preventDefault();
    }

     var convertInput = parseFloat($("#fromCurrInput").val());
     var money = fx(convertInput).convert({from:$("#fromCurrencySelect :selected").text(), to:$("#toCurrencySelect :selected").text()});
     console.log(money);
     
     // User amount + currency = End amount + target currency
     if (validParams()) {
        $("#inputError").html(" ");
        $("#convertResult").html($("#fromCurrInput").val() + " " + $("#fromCurrencySelect :selected").text() + " = " + money.toFixed(2) + " " + $("#toCurrencySelect :selected").text());
        $("#convertResult").css("color", "greenyellow");
     }
     else {
         $("#convertResult").html(" ");
         $("#convertResult").html("Invalid");
     } 
 });

 function validParams() {

     if ($("#fromCurrInput").val().length == 0) {
         valid = false;
         $("#inputError").html("Error: Amount required.");
         $("#inputError").css("color", "red");

         $("#convertResult").html("Invalid");
         $("#convertResult").css("color", "red");

     }

     if ($("#fromCurrInput").val() < 0) {
         valid = false;
         $("#inputError").html("Error: Negative amount.");
         $("#inputError").css("color", "red");
     }

     return valid;
 }

