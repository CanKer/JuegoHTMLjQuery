var $mouseX = 0, $mouseY = 0;
var $xp = 0, $yp =0;
$(document).ready(function()  {

  $('#jugador').click(function() {
    $('#contenedor').click(function() {
      $('#bala').animate({
        opacity: 1,
        top: "-=5000",
        height: "toggle"

      }, 2500);
    });
   alert("al darme click debería disparar pero aún no programo eso xD");
  });

  $(document).mousemove(function(e){
     $mouseX = e.pageX;
//     $mouseY = e.pageY;
  });

  var $loop = setInterval(function(){
  // change 12 to alter damping higher is slower
  $xp += (($mouseX - $xp)/12);
//  $yp += (($mouseY - $yp)/12);

  $("#jugador").css({left:$xp +'px', top:$yp +'500'});

  var jugador = $("#jugador").css({left:$xp +'px', top:$yp +'500'});


  }, 30);
    $("#coordenadas").html($(jugador).val());


});
