$('body').css({"background-color": "black"});
var ctx = document.getElementById("ctx").getContext("2d");
var alien1 = document.getElementById('alien1');
var alien2 = document.getElementById('alien2');
var alien3 = document.getElementById('alien3');
var alien4 = document.getElementById('alien4');
var alien5 = document.getElementById('alien5');
var score = 0;
//var tiempo = new Date().getTime();

//ctx.font('20px arcade');
ctx.font = '30px Arial';
ctx.fillStyle = 'white';
ctx.globalAlpha = 1;

//var tiempoInicio = Date.now();

//PONG
var lienzo = document.getElementById("ctx");
var WIDTH = lienzo.width, HEIGHT = lienzo.height;
var speedX = 5, speedY = 5, ballX = 300, ballY = 200;
var speed = 60, paddle1X = 50, paddle1Y = 0, paddle2X = WIDTH - 50, paddle2Y = 100;
var radio = 15;
var anguloFinal = 360 * Math.PI / 180;	



obtenerDistancias = function(enemigo, jugador)  {
	var vx = enemigo.x - jugador.x;
	var vy = enemigo.y - jugador.y;
	return Math.sqrt(vx*vx+vy*vy);
}

hacerColision = function(enemigo, jugador)  {
	var distancia = obtenerDistancias(enemigo, jugador);
	return distancia < 22;
}

obtenerDistanciasBA = function(bala, enemigo)	{
	var vx = enemigo.x - bala.x;
	var vy = enemigo.y - bala.y;
	return Math.sqrt(vx*vx+vy*vy);
}

hacerColisionBA = function(bala, enemigo)	{
	var distancia = obtenerDistanciasBA(bala, enemigo);
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
enemigos('E01', 140, 150, -2, 0, alien1);
enemigos('E02', 200, 150, -2, 0, alien2);
enemigos('E03', 260, 150, -2, 0, alien3);
enemigos('E04', 320, 150, -2, 0, alien4);
enemigos('E06', 140, 200, 2, 0, alien1);
enemigos('E07', 200, 200, 2, 0, alien2);
enemigos('E08', 260, 200, 2, 0, alien3);
enemigos('E09', 320, 200, 2, 0, alien4);
enemigos('E11', 140, 250, -2, 0, alien1);
enemigos('E12', 200, 250, -2, 0, alien2);
enemigos('E13', 260, 250, -2, 0, alien3);
enemigos('E14', 320, 250, -2, 0, alien4);
enemigos('E16', 140, 300, 2, 0, alien1);
enemigos('E17', 200, 300, 2, 0, alien2);
enemigos('E18', 260, 300, 2, 0, alien3);
enemigos('E19', 320, 300, 2, 0, alien4);

//Bloque medio
enemigos('E21', 440, 150, -2, 0, alien1);
enemigos('E22', 500, 150, -2, 0, alien2);
enemigos('E23', 560, 150, -2, 0, alien3);
enemigos('E24', 620, 150, -2, 0, alien4);
enemigos('E26', 440, 200, 2, 0, alien1);
enemigos('E27', 500, 200, 2, 0, alien2);
enemigos('E28', 560, 200, 2, 0, alien3);
enemigos('E29', 620, 200, 2, 0, alien4);
enemigos('E31', 440, 250, -2, 0, alien1);
enemigos('E32', 500, 250, -2, 0, alien2);
enemigos('E33', 560, 250, -2, 0, alien3);
enemigos('E34', 620, 250, -2, 0, alien4);
enemigos('E36', 440, 300, 2, 0, alien1);
enemigos('E37', 500, 300, 2, 0, alien2);
enemigos('E38', 560, 300, 2, 0, alien3);
enemigos('E39', 620, 300, 2, 0, alien4);

//Bloque derecho
enemigos('E41', 740, 150, -2, 0, alien1);
enemigos('E42', 800, 150, -2, 0, alien2);
enemigos('E43', 860, 150, -2, 0, alien3);
enemigos('E44', 920, 150, -2, 0, alien4);
enemigos('E46', 740, 200, 2, 0, alien1);
enemigos('E47', 800, 200, 2, 0, alien2);
enemigos('E48', 860, 200, 2, 0, alien3);
enemigos('E49', 920, 200, 2, 0, alien4);
enemigos('E51', 740, 250, -2, 0, alien1);
enemigos('E52', 800, 250, -2, 0, alien2);
enemigos('E53', 860, 250, -2, 0, alien3);
enemigos('E54', 920, 250, -2, 0, alien4);
enemigos('E56', 740, 300, 2, 0, alien1);
enemigos('E57', 800, 300, 2, 0, alien2);
enemigos('E58', 860, 300, 2, 0, alien3);
enemigos('E59', 920, 300, 2, 0, alien4);

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

jugadores('J1', 0, 660, 100, 0, 5, 'player');

balas = function(id){
var bala =	{
	x: listaJugadores['J1'].x + 90,
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

document.onclick = function(){
	balas(id);
	id++;
}

var ALTURA = 720;
var ANCHO = 1080;

document.onmousemove = function(mouse){
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

 ctx.drawImage(document.getElementById('player'), entidad.x, 600, 190, 100);
}
dibujarEntidadA = function(entidad) {
  ctx.drawImage(entidad.fig, entidad.x, entidad.y, 40, 40);
}
dibujarEntidadB = function(entidad) {
  ctx.fillRect(entidad.x, entidad.y, entidad.width, entidad.height);
}

for (var id in listaBalas)	{
	alert(listaBalas[id]);
}

update = function() {
  ctx.clearRect(0,0, ANCHO, ALTURA);
  
  //limpiar canvas
	clear();
	
	drawPaddle1();
	
	movePaddle2();
	drawPaddle2();
	//dibujar
	drawBall();
	
	//ball
	if (ballX + radio > WIDTH || ballX - radio < 0)		 speedX *= -1;
   		 
    if (ballY + radio > HEIGHT || ballY - radio  < 0)  	 speedY *= -1;
   
    detectCollisions();
   
    ballX += speedX;
	ballY += speedY;
  
  
	for(var id in listaBalas)	{
		movimientoB(listaBalas[id]);
	}

  for (var id in listaEnemigos)  {
    movimiento(listaEnemigos[id]);
    var colision = hacerColision(listaJugadores['J1'],listaEnemigos[id]);
    if (colision) {
      listaJugadores['J1'].vidas = listaJugadores['J1'].vidas - 1;
    //  console.log('Perdiste');
      //var tiempoTotal = tiempoInicio+=1;
    }
  }

for(var i in listaBalas){
	for (var j in listaEnemigos){
		var colision2 = hacerColisionBA(listaBalas[i], listaEnemigos[j]);
		if(colision2){
			delete listaEnemigos[j];
			delete listaBalas[i];
			score += 100;
			break;
		}
	}
}

  dibujarEntidadP(listaJugadores['J1'].fig);
  //ctx.font('20px arcade');
  ctx.fillText("Vidas: "+ listaJugadores['J1'].vidas + "           Score: " + score, 50, 50 );
}
  setInterval(update, 10);
   
//PONG
window.onload = function()
{
	//limpiar canvas
	//ctx.fillStyle = "#f0f0f0";
	//ctx.fillRect(0, 0, WIDTH, HEIGHT);
	//dibujar
	drawBall();
	drawPaddle1();
	//init();
	
}

function clear() 
{
  ctx.globalAlpha = 0.6;
  //ctx.fillStyle = "#f0f0f0";
  //ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.globalAlpha = 1.0;
}

function drawBall()
{	
	ctx.beginPath();
	ctx.arc(ballX, ballY, radio, 0, anguloFinal, false);
	ctx.strokeStyle = "blue";
	ctx.stroke(); 
	return;
}

function drawPaddle1()
{
	//limitar el paddle1 a la pantalla
	if(paddle1Y <= 0) 					paddle1Y = 0;
	else if(paddle1Y + 180 >= HEIGHT) 	paddle1Y = HEIGHT - 200;
	
	//draw paddle 
	ctx.beginPath();
	ctx.moveTo(paddle1X, paddle1Y);
	ctx.lineTo(paddle1X, paddle1Y + 180);
	ctx.lineWidth = 20;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#ABC231";
	ctx.stroke();	
	
}

function drawPaddle2()
{

	//draw paddle 
	ctx.beginPath();
	ctx.moveTo(paddle2X, paddle2Y);
	ctx.lineTo(paddle2X, paddle2Y + 180);
	ctx.lineWidth = 20;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#ABC231";
	ctx.stroke();	
	
}

function detectCollisions()
{
	if(ballX <= paddle1X + 20 + radio && ballY >= paddle1Y && ballY <= paddle1Y + 180 || ballX >= paddle2X - 20 - radio && ballY >= paddle2Y && 			ballY <= paddle2Y + 180) //Chocó con paddle1 || paddle2
	{
		speedX *= -1;
	}
}

function movePaddle2(){
	paddle2Y += speedY / 2;
	
	if(paddle2Y <= 0)						paddle2Y = 0;
	else if(paddle2Y + 180 >= HEIGHT) 		paddle2Y = HEIGHT - 200;
}

/*
function init()
{
	return setInterval(update, speed);
}*/

lienzo.onmousemove = function(event)
{
	paddle1Y = event.clientY;	
}