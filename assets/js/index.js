console.log("testload");

$(document).ready(function(){
    $("#test-text").text("added by jquery");
    $.getJSON("assets/js/data_songlist.json", function(data){
        console.log(data);
    });
});

console.log("end of js file");