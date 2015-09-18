$('body').css({"background-color": "black"});
var ctx = document.getElementById("ctx").getContext("2d");
var alien1 = document.getElementById('alien1');
var alien2 = document.getElementById('alien2');
var alien3 = document.getElementById('alien3');
var alien4 = document.getElementById('alien4');
var alien5 = document.getElementById('alien5');
var score = 0;
var velEnemigos = 2;
var tiempo1 = 0, tiempo2 = 0;

//ctx.font('20px arcade');
ctx.font = 'bold 30px monospace';
ctx.fillStyle = 'white';
ctx.globalAlpha = 1;

//PONG
var lienzo = document.getElementById("ctx");
var WIDTH = lienzo.width, HEIGHT = lienzo.height;
var speedX = 5, speedY = 5, ballX = 300, ballY = 200;
var speed = 60, paddle1X = 50, paddle1Y = 0, paddle2X = WIDTH - 50, paddle2Y = 100;
var radio = 15;
var anguloFinal = 360 * Math.PI / 180;	

obtenerDistancias = function(enemigo, entidad){
	var vx = enemigo.x - entidad.x;
	var vy = enemigo.y - entidad.y;
	return Math.sqrt(vx*vx+vy*vy);
}

hacerColisionEne = function(enemigo, bala) {
	var distancia = obtenerDistancias(enemigo, bala);
	return distancia < 22;
}

hacerColisionJug = function(balaEnemigo, jugador)  {
	var distancia = obtenerDistancias(balaEnemigo, jugador);
	return distancia < 100;
}

//Enemigo
var listaEnemigos = {};

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

/*enemigos('E1', 80, 10, 50, 10, 'o');
enemigos('E2', 70, 20, 40, 20, 'o');
enemigos('E3', 60, 30, 30, 30, 'o');
enemigos('E4', 50, 40, 20, 40, 'o');
enemigos('E5', 40, 50, 10, 50, 'o'); */

//Bloque izquierdo
enemigos(0, 140, 150, -velEnemigos, 0, alien1);
enemigos(1, 200, 150, -velEnemigos, 0, alien2);
enemigos(2, 260, 150, -velEnemigos, 0, alien3);
enemigos(3, 320, 150, -velEnemigos, 0, alien4);
enemigos(4, 140, 200, velEnemigos, 0, alien1);
enemigos(5, 200, 200, velEnemigos, 0, alien2);
enemigos(6, 260, 200, velEnemigos, 0, alien3);
enemigos(7, 320, 200, velEnemigos, 0, alien4);
enemigos(8, 140, 250, -velEnemigos, 0, alien1);
enemigos(9, 200, 250, -velEnemigos, 0, alien2);
enemigos(10, 260, 250, -velEnemigos, 0, alien3);
enemigos(11, 320, 250, -velEnemigos, 0, alien4);
enemigos(12, 140, 300, velEnemigos, 0, alien1);
enemigos(13, 200, 300, velEnemigos, 0, alien2);
enemigos(14, 260, 300, velEnemigos, 0, alien3);
enemigos(15, 320, 300, velEnemigos, 0, alien4);

//Bloque medio
enemigos(16, 440, 150, -velEnemigos, 0, alien1);
enemigos(17, 500, 150, -velEnemigos, 0, alien2);
enemigos(18, 560, 150, -velEnemigos, 0, alien3);
enemigos(19, 620, 150, -velEnemigos, 0, alien4);
enemigos(20, 440, 200, velEnemigos, 0, alien1);
enemigos(21, 500, 200, velEnemigos, 0, alien2);
enemigos(22, 560, 200, velEnemigos, 0, alien3);
enemigos(23, 620, 200, velEnemigos, 0, alien4);
enemigos(24, 440, 250, -velEnemigos, 0, alien1);
enemigos(25, 500, 250, -velEnemigos, 0, alien2);
enemigos(26, 560, 250, -velEnemigos, 0, alien3);
enemigos(27, 620, 250, -velEnemigos, 0, alien4);
enemigos(28, 440, 300, velEnemigos, 0, alien1);
enemigos(29, 500, 300, velEnemigos, 0, alien2);
enemigos(30, 560, 300, velEnemigos, 0, alien3);
enemigos(31, 620, 300, velEnemigos, 0, alien4);

//Bloque derecho
enemigos(32, 740, 150, -velEnemigos, 0, alien1);
enemigos(33, 800, 150, -velEnemigos, 0, alien2);
enemigos(34, 860, 150, -velEnemigos, 0, alien3);
enemigos(35, 920, 150, -velEnemigos, 0, alien4);
enemigos(36, 740, 200, velEnemigos, 0, alien1);
enemigos(37, 800, 200, velEnemigos, 0, alien2);
enemigos(38, 860, 200, velEnemigos, 0, alien3);
enemigos(38, 920, 200, velEnemigos, 0, alien4);
enemigos(39, 740, 250, -velEnemigos, 0, alien1);
enemigos(40, 800, 250, -velEnemigos, 0, alien2);
enemigos(41, 860, 250, -velEnemigos, 0, alien3);
enemigos(42, 920, 250, -velEnemigos, 0, alien4);
enemigos(43, 740, 300, velEnemigos, 0, alien1);
enemigos(44, 800, 300, velEnemigos, 0, alien2);
enemigos(45, 860, 300, velEnemigos, 0, alien3);
enemigos(46, 920, 300, velEnemigos, 0, alien4);

//Jugador
jugadores = function(id, x, y, velX, velY, vidas, fig){
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
var jugador = listaJugadores['J1'];

//Balas
balas = function(id){
	var bala =	{
		x: jugador.x + 90,
		y: jugador.y,
		velX: 0,
		velY: 10,
		width: 10,
		height: 10,
	};
	listaBalas[id] = bala;
}

var listaBalas = {};

document.onclick = function(){
	balas();
}

//Balas enemigo
balasEnemigos = function(id){
	var balaEnemigo =	{
		x: listaEnemigos[id].x,
		y: listaEnemigos[id].y,
		velX: 0,
		velY: -5,
		width: 10,
		height: 10,
		id: listaEnemigos[id].id,
	};
	 listaBalasEnemigos[id] = balaEnemigo;
}

var listaBalasEnemigos = {};

//Generar balas aleatorias en los enemigos
generarBalas = function(){
	var id = Math.floor(Math.random() * 47);
	console.log("id: " + id);
	balasEnemigos(id);
}

var ALTURA = 720;
var ANCHO = 1080;

//Mover la nave con el mouse
document.onmousemove = function(mouse){
  var mouseX = mouse.clientX - 100;
  var mouseY = mouse.clientY;

		if(mouseX < jugador.width/2){
			mouseX = jugador.width/2;
		}if(mouseX > ANCHO-jugador.width/2){
			mouseX = ANCHO - jugador.width/2;
		}if(mouseY < jugador.height/2){
			mouseY = jugador.height/2;
		}if(mouseY > ALTURA - jugador.height/2){
			mouseY = ALTURA - jugador.height/2;
		}

  jugador.x = mouseX;
  dibujarEntidadP(jugador);
}

//Mover aliens
movimiento = function(entidad, tiempo) {
	dibujarEntidadA(entidad);
	dibujarMovimientos(entidad, tiempo);
	//dibujarEntidadP(jugador);

}
movimientoB = function(entidad)	{
	dibujarEntidadB(entidad);
	dibujarMovimientosB(entidad);
}

dibujarMovimientosB = function(entidad) {
	entidad.y -= entidad.velY;
}

dibujarMovimientos = function(entidad, tiempo) {
	entidad.x += entidad.velX;
	entidad.y += entidad.velY;

	if(entidad.x <= 0 || entidad.x >= ANCHO){
		entidad.velX = -entidad.velX;
	}
	if(tiempo >= 750){
		entidad.y += 50;
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
dibujarEntidadBalasEnemigo = function(entidad) {
	//ctx.fillStyle = "#FF0000";
	ctx.fillRect(entidad.x, entidad.y, entidad.width, entidad.height);
}

//UPDATE
update = function() {
	tiempo1++;
	tiempo2++;
	ctx.fillStyle = "#FFF";
	ctx.clearRect(0,0, ANCHO, ALTURA);
	ctx.fillText("Vidas: "+ jugador.vidas + "           Score: " + score, 50, 50 );

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
  
  	/* SPACE INVADERS */
  	
  	dibujarEntidadP(jugador);
  	
  	for(var id in listaBalas){
		movimientoB(listaBalas[id]);
	}

	for(var id in listaBalasEnemigos){
		movimientoB(listaBalasEnemigos[id]);
		var colision = hacerColisionJug(listaBalasEnemigos[id],jugador);
		if(colision){
		  delete listaBalasEnemigos[id];
		  jugador.vidas = jugador.vidas - 1;
		  console.log('Perdiste');
		  break;
		}
	}

  	for(var id in listaEnemigos) {
  		movimiento(listaEnemigos[id], tiempo2);
	}	

	for(var i in listaBalas){
		for (var j in listaEnemigos){
			var colision = hacerColisionEne(listaEnemigos[j],listaBalas[i]);
			if(colision){
				delete listaEnemigos[j];
				delete listaBalas[i];
				score += 100;
				break;
			}
		}
	}
	
	//Tiempo para que los aliens disparen
	if(tiempo1 >= 200){
		tiempo1 = 0;
		for(i = 0; i < 10; i++){
			generarBalas();
		}	
	}
	
	//Tiempo para que los aliens bajen
	if(tiempo2 >= 750){
		tiempo2 = 0;
	}
	
	//Pantalla perdiste
	if(jugador.vidas == 0){
		//Llamar a la otra pantalla
	}	
}
	setInterval(update, 10);

//PONG
window.onload = function(){
	//dibujar
	drawBall();
	drawPaddle1();
}

function clear(){
	ctx.globalAlpha = 0.6;
	ctx.globalAlpha = 1.0;
}

function drawBall(){	
	ctx.beginPath();
	ctx.arc(ballX, ballY, radio, 0, anguloFinal, false);
	ctx.strokeStyle = "blue";
	ctx.stroke(); 
	return;
}

function drawPaddle1(){
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

function drawPaddle2(){
	//draw paddle 
	ctx.beginPath();
	ctx.moveTo(paddle2X, paddle2Y);
	ctx.lineTo(paddle2X, paddle2Y + 180);
	ctx.lineWidth = 20;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#ABC231";
	ctx.stroke();		
}

function detectCollisions(){
	if(ballX <= paddle1X + 20 + radio && ballY >= paddle1Y && ballY <= paddle1Y + 180 || ballX >= paddle2X - 20 - radio && ballY >= paddle2Y && 			ballY <= paddle2Y + 180){ //Chocó con paddle1 || paddle2
		speedX *= -1;
	}
}

function movePaddle2(){
	paddle2Y += speedY / 2;
	
	if(paddle2Y <= 0)						paddle2Y = 0;
	else if(paddle2Y + 180 >= HEIGHT) 		paddle2Y = HEIGHT - 200;
}

lienzo.onmousemove = function(event){
	paddle1Y = event.clientY;	
}