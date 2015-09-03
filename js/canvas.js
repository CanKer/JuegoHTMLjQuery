var ctx = document.getElementById("ctx").getContext("2d");
var naveJ = document.getElementById('player');
var alien1 = document.getElementById('alien1');
var alien2 = document.getElementById('alien2');
var alien3 = document.getElementById('alien3');
var alien4 = document.getElementById('alien4');
var alien5 = document.getElementById('alien5');


//$('#ctx').css('background-color', 'rgba(158, 167, 184, 0.2)');

ctx.font = '30px Arial';
ctx.fillStyle = 'red';
ctx.globalAlpha = 1;

var tiempoInicio = Date.now();

obtenerDistancias = function(enemigo, jugador)  {
	var vx = enemigo.x - jugador.x;
	var vy = enemigo.y - jugador.y;
	return Math.sqrt(vx*vx+vy*vy);
}

hacerColision = function(enemigo, jugador)  {
	var distancia = obtenerDistancias(enemigo, jugador);
	return distancia < 22;
}

//Enemigo
enemigos = function(id, x, y, velX, velY, fig){
	var alien = {
	  x: x,
	  y: y,
	  velX: velX,
	  velY: velY,
	  fig: fig,
	  id: id,
	};
	listaEnemigos[id] = alien;
}
var listaEnemigos = {};

/*enemigos('E1', 80, 10, 50, 10, 'o');
enemigos('E2', 70, 20, 40, 20, 'o');
enemigos('E3', 60, 30, 30, 30, 'o');
enemigos('E4', 50, 40, 20, 40, 'o');
enemigos('E5', 40, 50, 10, 50, 'o'); */

//Bloque izquierdo
enemigos('E01', 140, 150, -1, 0, alien1);
enemigos('E02', 190, 150, -1, 0, alien2);
enemigos('E03', 240, 150, -1, 0, alien3);
enemigos('E04', 290, 150, -1, 0, alien4);
enemigos('E05', 340, 150, -1, 0, alien5);
enemigos('E06', 140, 200, 1, 0, alien1);
enemigos('E07', 190, 200, 1, 0, alien2);
enemigos('E08', 240, 200, 1, 0, alien3);
enemigos('E09', 290, 200, 1, 0, alien4);
enemigos('E10', 340, 200, 1, 0, alien5);
enemigos('E11', 140, 250, -1, 0, alien1);
enemigos('E12', 190, 250, -1, 0, alien2);
enemigos('E13', 240, 250, -1, 0, alien3);
enemigos('E14', 290, 250, -1, 0, alien4);
enemigos('E15', 340, 250, -1, 0, alien5);
enemigos('E16', 140, 300, 1, 0, alien1);
enemigos('E17', 190, 300, 1, 0, alien2);
enemigos('E18', 240, 300, 1, 0, alien3);
enemigos('E19', 290, 300, 1, 0, alien4);
enemigos('E20', 340, 300, 1, 0, alien5);

//Bloque medio
enemigos('E21', 440, 150, -1, 0, alien1);
enemigos('E22', 490, 150, -1, 0, alien2);
enemigos('E23', 540, 150, -1, 0, alien3);
enemigos('E24', 590, 150, -1, 0, alien4);
enemigos('E25', 640, 150, -1, 0, alien5);
enemigos('E26', 440, 200, 1, 0, alien1);
enemigos('E27', 490, 200, 1, 0, alien2);
enemigos('E28', 540, 200, 1, 0, alien3);
enemigos('E29', 590, 200, 1, 0, alien4);
enemigos('E30', 640, 200, 1, 0, alien5);
enemigos('E31', 440, 250, -1, 0, alien1);
enemigos('E32', 490, 250, -1, 0, alien2);
enemigos('E33', 540, 250, -1, 0, alien3);
enemigos('E34', 590, 250, -1, 0, alien4);
enemigos('E35', 640, 250, -1, 0, alien5);
enemigos('E36', 440, 300, 1, 0, alien1);
enemigos('E37', 490, 300, 1, 0, alien2);
enemigos('E38', 540, 300, 1, 0, alien3);
enemigos('E39', 590, 300, 1, 0, alien4);
enemigos('E40', 640, 300, 1, 0, alien5);

//Bloque derecho
enemigos('E41', 740, 150, -1, 0, alien1);
enemigos('E42', 790, 150, -1, 0, alien2);
enemigos('E43', 840, 150, -1, 0, alien3);
enemigos('E44', 890, 150, -1, 0, alien4);
enemigos('E45', 940, 150, -1, 0, alien5);
enemigos('E46', 740, 200, 1, 0, alien1);
enemigos('E47', 790, 200, 1, 0, alien2);
enemigos('E48', 840, 200, 1, 0, alien3);
enemigos('E49', 890, 200, 1, 0, alien4);
enemigos('E50', 940, 200, 1, 0, alien5);
enemigos('E51', 740, 250, -1, 0, alien1);
enemigos('E52', 790, 250, -1, 0, alien2);
enemigos('E53', 840, 250, -1, 0, alien3);
enemigos('E54', 890, 250, -1, 0, alien4);
enemigos('E55', 940, 250, -1, 0, alien5);
enemigos('E56', 740, 300, 1, 0, alien1);
enemigos('E57', 790, 300, 1, 0, alien2);
enemigos('E58', 840, 300, 1, 0, alien3);
enemigos('E59', 890, 300, 1, 0, alien4);
enemigos('E60', 940, 300, 1, 0, alien5);

//Jugador
jugadores = function(id, x, y, velX, velY, vidas, fig) {
	var nave = {
	  x: x,
	  y: y,
	  velX: velX,
	  velY: velY,
	  fig: fig,
	  id: id,
	  vidas: vidas,
	};
	listaJugadores[id] = nave;
}
var listaJugadores = {};

jugadores('J1', 0, 660, 100, 0, 5, naveJ);

balas = function(id){
var bala =	{
	x: listaJugadores['J1'].x + 55,
	y: listaJugadores['J1'].y,
	velX: 0,
	velY: 10,
	width: 10,
	height: 10,
	angulo: 100,
	id: id,
};
 listaBalas[id] = bala;
}

var listaBalas = {};
	var id = 0;
document.onclick = function()	{

	balas(id);
	id++;
	console.log(balas());
}



var ALTURA = 720;
var ANCHO = 1080;

document.onmousemove = function(mouse)  {
  var mouseX = mouse.clientX;
  var mouseY = mouse.clientY;

		if(mouseX < listaJugadores['J1'].width/2)	{
			mouseX = listaJugadores['J1'].width/2;
		}	if (mouseX > ANCHO-listaJugadores['J1'].width/2) {
			mouseX = ANCHO - listaJugadores['J1'].width/2;
		}	if (mouseY < listaJugadores['J1'].height/2) {
			mouseY = listaJugadores['J1'].height/2;
		}	if (mouseY > ALTURA - listaJugadores['J1'].height/2) {
			mouseY = ALTURA - listaJugadores['J1'].height/2;
		}

  listaJugadores['J1'].x = mouseX;
  dibujarEntidadP(listaJugadores['J1']);
//  console.log(listaJugadores['J1'].x = mouseX);
  //listaJugadores['J1'].y = mouseY;
}

movimiento = function(entidad) {
  dibujarEntidadA(entidad);
	dibujarMovimientos(entidad);
  dibujarEntidadP(listaJugadores['J1']);

}
movimientoB = function(entidad)	{
	dibujarEntidadB(entidad);
	dibujarMovimientosB(entidad);
}

dibujarMovimientosB = function(entidad) {
  entidad.y -= entidad.velY;
}

dibujarMovimientos = function(entidad) {
  entidad.x += entidad.velX;
  entidad.y += entidad.velY;

  if (entidad.x <= 0 || entidad.x >= ANCHO) {
      entidad.velX = -entidad.velX;
  }
  if (entidad.y <= 0 || entidad.y >= ALTURA) {
      entidad.velY = -entidad.velY;
  }
}

dibujarEntidadP = function(entidad) {
 ctx.drawImage(entidad.fig, entidad.x, 600, 120, 100);
}
dibujarEntidadA = function(entidad) {
  ctx.drawImage(entidad.fig, entidad.x, entidad.y, 40, 40);
}
dibujarEntidadB = function(entidad) {
  ctx.fillRect(entidad.x, entidad.y, entidad.width, entidad.height);
}


update = function() {

  ctx.clearRect(0,0, ANCHO, ALTURA);
	for(var id in listaBalas)	{
		movimientoB(listaBalas[id]);
	}
  for (var id in listaEnemigos)  {
    movimiento(listaEnemigos[id]);
    var colision = hacerColision(listaJugadores['J1'],listaEnemigos[id]);
    if (colision) {
      listaJugadores['J1'].vidas = listaJugadores['J1'].vidas - 1;
    //  console.log('Perdiste');
      var tiempoTotal = tiempoInicio+=1;
    }
  }

  dibujarEntidadP(listaJugadores['J1'].fig);
  ctx.fillText("Vidas: "+ listaJugadores['J1'].vidas + "           Tiempo: " + tiempoTotal, 50, 50);
}
  setInterval(update, 10);
