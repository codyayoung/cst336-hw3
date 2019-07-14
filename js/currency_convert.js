var endpoint = 'latest';
var access_key = '4bcc15953df748344dc29b93d16439fc';
var base = 'USD';

// On window load, populates currency select menus 
$(document).ready(function(){
    $.ajax({
        method: "GET",
            url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,
        dataType: "json",
            data: {"rates": $('#rates').val() },
    
        success: function(result, status) {
            for (var i=0; i < result.length; i++) {
                $("#fromCurrencySelect").append("<option>" + result[i].rates + "</option>");
            }    
        }
    }); 
});