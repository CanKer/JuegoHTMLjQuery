var $mouseX = 0,
  $mouseY = 0;
var $xp = 0,
  $yp = 0;
$(document).ready(function() {

  /* $(document).mousemove(function() {
     var p = $("#coordenadas").html($(jugador).val());
     $('#bala').position(p);
   });
*/

  // var p = $("#coordenadas").html($(jugador).val());
  // $('#bala').position(p);

  $(document).mousemove(function(e) {
    $mouseX = e.pageX;
    //     $mouseY = e.pageY;
  });

  var $loop = setInterval(function() {
    // change 12 to alter damping higher is slower
    $xp += (($mouseX - $xp) / 12);
    //  $yp += (($mouseY - $yp)/12);

    $("#jugador").css({
      left: $xp + 'px',
      top: $yp + '500'
    });

    var jugador = $("#jugador").css({
      left: $xp + 'px',
      top: $yp + '500'
    });
  }, 30);

  $("#coordenadas").html($(jugador).val());

  $('body').click(function() {
    $('#bala').animate({
      opacity: 1,
      top: "-=581",
      height: "toggle"
    }, 750);
    if ($('#bala').css('top') == '-1px') {
      //    x=$("#jugador").offset().left;
      //    y=$("#jugador").offset().top;
      $("#bala").css({
        left: 500,
        top: 580
      });

    }
  });

});
