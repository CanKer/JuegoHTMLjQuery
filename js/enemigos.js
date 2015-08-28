var $mouseX = 0,
  $mouseY = 0;
var $xp = 0,
  $yp = 0;
$(document).ready(function() {

	/*$('#primerA').on('load', function(){
		$(this).animate({'left' : '-20px'});
	});*/
	var movido = 0;
	
	function cargaEnemigos(){
		console.log("Enemigo se ha movido!!! ;)");
		
		if(movido%2 == 0){
			$(this).animate({'left' : '-20px'},500);
		}else{
			$(this).animate({'left' : '20px'},500);
		}
		movido++;
		console.log(movido);
		//alert("load");
	}
	
	$('#primerA').on('click', cargaEnemigos);
	
	var vertic = { duration : 900, easing : 'linear' };
	
	$('.aliens').repeat()
  	.animate({top:160},vertic)
  	.animate({top:0},vertic).join();​
});
