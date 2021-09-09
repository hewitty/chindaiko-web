$(document).ready(function(){
    $.getJSON("assets/js/data_songlist.json", function(data){
        console.log(data);
    });
});