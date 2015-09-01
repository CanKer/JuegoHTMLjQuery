var ctx = document.getElementById("ctx").getContext("2d");
var naveJ = document.getElementById('player');

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

enemigos('E01', 440, 150, -5, 0, 'o');
enemigos('E02', 490, 150, -5, 0, 'o');
enemigos('E03', 540, 150, -5, 0, 'o');
enemigos('E04', 590, 150, -5, 0, 'o');
enemigos('E05', 640, 150, -5, 0, 'o');
enemigos('E06', 440, 200, 5, 0, 'o');
enemigos('E07', 490, 200, 5, 0, 'o');
enemigos('E08', 540, 200, 5, 0, 'o');
enemigos('E09', 590, 200, 5, 0, 'o');
enemigos('E10', 640, 200, 5, 0, 'o');
enemigos('E11', 440, 250, -5, 0, 'o');
enemigos('E12', 490, 250, -5, 0, 'o');
enemigos('E13', 540, 250, -5, 0, 'o');
enemigos('E14', 590, 250, -5, 0, 'o');
enemigos('E15', 640, 250, -5, 0, 'o');
enemigos('E16', 440, 300, 5, 0, 'o');
enemigos('E17', 490, 300, 5, 0, 'o');
enemigos('E18', 540, 300, 5, 0, 'o');
enemigos('E19', 590, 300, 5, 0, 'o');
enemigos('E20', 640, 300, 5, 0, 'o');

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
listaJugadores[id] = nave
}
var listaJugadores = {};

jugadores('J1', 0, 660, 100, 0, 5, naveJ);


var ALTURA = 720;
var ANCHO = 1080;

document.onmousemove = function(mouse)  {
  var mouseX = mouse.clientX;
  var mouseY = mouse.clientY;

  listaJugadores['J1'].fig.x = mouseX;
//  listaJugadores['J1'].y = mouseY;
}

movimiento = function(entidad) {
  dibujarEntidadA(entidad);
  dibujarMovimientos(entidad);
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
  //console.log(x);
}

dibujarEntidadP = function(entidad) {
  ctx.drawImage(entidad, 50, 50);
  //ctx.fillText(entidad.fig, entidad.x, entidad.y);
}
dibujarEntidadA = function(entidad) {
  //ctx.drawImage(listaJugadores['J1'].fig, entidad.x, entidad.y);
  ctx.fillText(entidad.fig, entidad.x, entidad.y);
}

update = function() {
  ctx.clearRect(0,0, ANCHO, ALTURA);

  for (var id in listaEnemigos)  {
    movimiento(listaEnemigos[id]);
    var colision = hacerColision(listaJugadores['J1'],listaEnemigos[id]);
    if (colision) {
      listaJugadores['J1'].vidas = listaJugadores['J1'].vidas - 1;
      console.log('Perdiste');
      var tiempoTotal = tiempoInicio+=1;
    }
  }
  //ctx.drawImage(listaJugadores['J1'].fig, 0,0);
  //var grafico = ctx.drawImage(listaJugadores['J1'].fig, 0,0);
  dibujarEntidadP(listaJugadores['J1'].fig);
  ctx.fillText("Vidas: "+ listaJugadores['J1'].vidas + "           Tiempo: " + tiempoTotal, 50, 50);



}
  setInterval(update, 250);

//  ctx.fillText('hello', 50, 50);
//  ctx.fillRect(50,50, 100, 100);
//  ctx.clearRect(75, 75, 50, 50);
