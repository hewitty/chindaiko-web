var menuIcon = document.getElementById('menu-icon');
$(document).ready(function(){
    $('#menu-icon').on('click', function(){
        if($('#menu-icon-container').hasClass('active')){
            
        }else{
            
        }
        $('.nav-menu').toggleClass('d-none');
        $('#menu-icon-container').toggleClass('active');
    });
});

