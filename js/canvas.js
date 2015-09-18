
var ctx = document.getElementById("ctx").getContext("2d");

/*--------------------------------------------------------- SPACE INVADERS -----------------------------------------------------------*/
var lienzo = document.getElementById("ctx");
var WIDTH = lienzo.width, HEIGHT = lienzo.height;

var shootSFX = new Audio("audio/shoot.wav");
var deathSFX = new Audio("audio/explosion.wav");
var alienKilledSFX = new Audio("audio/invaderkilled.wav	");
var gameOverMusic = new Audio("audio/game-over.mp3");

var alienMorado = document.getElementById('alienMorado');
var alienAmarillo = document.getElementById('alienAmarillo');
var alienRojo = document.getElementById('alienRojo');
var alienVerde = document.getElementById('alienVerde');

//var alien5 = document.getElementById('alien5');
/*
var alienMorado = new Image();
alienMorado.src = "img/alienMorado.png";

var alienAmarillo = new Image();
alienAmarillo.src = "img/alienAmarillo-original.png";

var alienMorado = new Image();
alienMorado.src = "img/alienMorado.png";

var alienVerde = new Image();
alienVerde.src = "img/alienVerde.png";

*/
var score = 0;
var velEnemigos = 4;
var timerDisparoAlien = 0, timerDesplazoAlien = 0;
var color = "blue"


var jugadorWidth = 85;
var jugadorHeight = 50;

var alienWidth = 40;
var alienHeight = 40;


var limiteDuracionPowerup = 6000 / 17; //6000ms / 17ms == número de veces que se tiene que ejecutar el game loop en 6 segundos
var timerPowerupActivo = limiteDuracionPowerup; //Empieza superando el límite para poder activar powerups

var enemyCount = 48; 

var listaJugadores = {};
var listaBalas = {};
var listaEnemigos = {};
var listaBalasEnemigos = {};

//Jugador
crearJugador = function(id, x, y, velX, velY, vidas, fig){
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


dibujarJugador = function()
{
	if(jugador.x < jugador.width/2)
		{
			jugador.x = jugador.width/2;
		}
		
		if(jugador.y > WIDTH - jugador.width/2)
		{
			jugador.y = WIDTH - jugador.width/2;
		}
		
	//Dibujar jugador
	ctx.drawImage(document.getElementById('player'), jugador.x, 660, jugadorWidth, jugadorHeight);
}


//Balas
crearBala = function(id, y){
	var bala =	{
		x: jugador.x + jugadorWidth / 2,
		y: 660,
		velX: 0,
		velY: 10,
		width: 10,
		height: 10,
	};
	bala.y -= y;
	listaBalas[id] = bala;
}


//La bala puede ser amiga o enemiga
dibujarBala = function(bala)
{
	//Actualizar posición
	bala.y -= bala.velY;
	
	//Dibujar bala
	ctx.fillRect(bala.x, bala.y, bala.width, bala.height);
	
}


//Balas enemigo
crearBalaEnemiga = function(id){
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

//Generar balas aleatorias en los enemigos
generarBalas = function(id, y)
{
	var id = Math.floor(Math.random() * enemyCount);
	//console.log("id: " + id + " y: " + y);
	crearBalaEnemiga(id);
}

//ALIENS
crearEnemigo = function(id, x, y, velX, velY, fig){
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


dibujarAlien = function(entidad, tiempo) {
	
	//Actualizar posición
	entidad.x += entidad.velX;
	entidad.y += entidad.velY;

	if(listaEnemigos[0].x <= 0 || listaEnemigos[35].x >= WIDTH){
		entidad.velX = -entidad.velX;
	}
	if(tiempo >= 750){
		entidad.y += 50;
	}
	
	//Dibujar alien
	//ctx.drawImage(document.getElementById(entidad.fig + ), entidad.x, entidad.y, 40, 40);
	ctx.drawImage(entidad.fig, entidad.x, entidad.y, alienWidth, alienHeight);

};
//FIN ALIENS

obtenerDistancias = function(enemigo, entidad)
{
	var vx = enemigo.x - entidad.x;
	var vy = enemigo.y - entidad.y;
	return Math.sqrt(vx * vx + vy * vy);
}

hacerColisionEne = function(enemigo, bala) 
{
	var distancia = obtenerDistancias(enemigo, bala);
	return distancia < 22;
}

hacerColisionJug = function(balaEnemigo, jugador)  
{
	var distancia = obtenerDistancias(balaEnemigo, jugador);
	return distancia < 100;
}

	//Bloque izquierdo
	crearEnemigo(0, 140, 150, -velEnemigos, 0, alienMorado);
	crearEnemigo(1, 200, 150, -velEnemigos, 0, alienAmarillo);
	crearEnemigo(2, 260, 150, -velEnemigos, 0, alienRojo);
	crearEnemigo(3, 320, 150, -velEnemigos, 0, alienVerde);
	crearEnemigo(4, 140, 200, velEnemigos, 0, alienMorado);
	crearEnemigo(5, 200, 200, velEnemigos, 0, alienAmarillo);
	crearEnemigo(6, 260, 200, velEnemigos, 0, alienRojo);
	crearEnemigo(7, 320, 200, velEnemigos, 0, alienVerde);
	crearEnemigo(8, 140, 250, -velEnemigos, 0, alienMorado);
	crearEnemigo(9, 200, 250, -velEnemigos, 0, alienAmarillo);
	crearEnemigo(10, 260, 250, -velEnemigos, 0, alienRojo);
	crearEnemigo(11, 320, 250, -velEnemigos, 0, alienVerde);
	crearEnemigo(12, 140, 300, velEnemigos, 0, alienMorado);
	crearEnemigo(13, 200, 300, velEnemigos, 0, alienAmarillo);
	crearEnemigo(14, 260, 300, velEnemigos, 0, alienRojo);
	crearEnemigo(15, 320, 300, velEnemigos, 0, alienVerde);
	
	//Bloque medio
	crearEnemigo(16, 440, 150, -velEnemigos, 0, alienMorado);
	crearEnemigo(17, 500, 150, -velEnemigos, 0, alienRojo);
	crearEnemigo(18, 560, 150, -velEnemigos, 0, alienMorado);
	crearEnemigo(19, 620, 150, -velEnemigos, 0, alienVerde);
	crearEnemigo(20, 440, 200, velEnemigos, 0, alienMorado);
	crearEnemigo(21, 500, 200, velEnemigos, 0, alienAmarillo);
	crearEnemigo(22, 560, 200, velEnemigos, 0, alienRojo);
	crearEnemigo(23, 620, 200, velEnemigos, 0, alienVerde);
	crearEnemigo(24, 440, 250, -velEnemigos, 0, alienMorado);
	crearEnemigo(25, 500, 250, -velEnemigos, 0, alienAmarillo);
	crearEnemigo(26, 560, 250, -velEnemigos, 0, alienRojo);
	crearEnemigo(27, 620, 250, -velEnemigos, 0, alienVerde);
	crearEnemigo(28, 440, 300, velEnemigos, 0, alienMorado);
	crearEnemigo(29, 500, 300, velEnemigos, 0, alienAmarillo);
	crearEnemigo(30, 560, 300, velEnemigos, 0, alienRojo);
	crearEnemigo(31, 620, 300, velEnemigos, 0, alienVerde);
	
	//Bloque derecho
	crearEnemigo(32, 740, 150, -velEnemigos, 0, alienMorado);
	crearEnemigo(33, 800, 150, -velEnemigos, 0, alienAmarillo);
	crearEnemigo(34, 860, 150, -velEnemigos, 0, alienRojo);
	crearEnemigo(35, 920, 150, -velEnemigos, 0, alienVerde);
	crearEnemigo(36, 740, 200, velEnemigos, 0, alienMorado);
	crearEnemigo(37, 800, 200, velEnemigos, 0, alienAmarillo);
	crearEnemigo(38, 860, 200, velEnemigos, 0, alienRojo);
	crearEnemigo(38, 920, 200, velEnemigos, 0, alienVerde);
	crearEnemigo(39, 740, 250, -velEnemigos, 0, alienMorado);
	crearEnemigo(40, 800, 250, -velEnemigos, 0, alienAmarillo);
	crearEnemigo(41, 860, 250, -velEnemigos, 0, alienRojo);
	crearEnemigo(42, 920, 250, -velEnemigos, 0, alienVerde);
	crearEnemigo(43, 740, 300, velEnemigos, 0, alienMorado);
	crearEnemigo(44, 800, 300, velEnemigos, 0, alienAmarillo);
	crearEnemigo(45, 860, 300, velEnemigos, 0, alienRojo);
	crearEnemigo(46, 920, 300, velEnemigos, 0, alienVerde);

	crearJugador('J1', 0, 660, 100, 0, 5, 'player');
	
	var jugador = listaJugadores['J1'];

document.onclick = function()
{
	crearBala(0,0);
	shootSFX.play();
}

//Mover la nave con el mouse
document.onmousemove = function(mouse)
{
  jugador.x = mouse.clientX - 100;
  jugador.y = mouse.clientY;

  dibujarJugador();
}

//Definir power-ups
function activarPowerUp(color){
	switch(color){
		case "amarillo":
			//dibujarAliens
		break;
		
		case "morado":
			jugadorWidth = 85;			
		break;
		
		case "rojo":
			//dibujarAliens
			//velEnemigos = ;
		break;		
		
		case "verde":
			document.onclick = function()
			{
				crearBala(0, 0);
				crearBala(1, 50);
				shootSFX.play();
			}
		break;
	}
}

function detectarPowerUps()
{
	for(var i in listaEnemigos)
	{
		var alien = listaEnemigos[i];
		
		//Chocó con el alien
		if(ballX - radio <= alien.x + alienWidth && ballX + radio >= alien.x && ballY - radio <= alien.y + alienHeight && ballY + radio >= 					alien.y)
		{
			timerPowerupActivo = 0; //El powerup está activo y hay que resetear el timer
			
			//console.log("Chocó con alien");
			
			if(alien.fig == alienAmarillo)
			{
				activarPowerUp("amarillo");
				color = "yellow"
				console.log("Chocó con alien amarillo");
			} 
			else if(alien.fig == alienRojo)
			{
				activarPowerUp("rojo");
				color = "red"
				powerUpRojoActivado = true;
				console.log("Chocó con alien rojo");
			}
			else if(alien.fig == alienMorado)
			{
				activarPowerUp("morado");
				color = "purple"
				console.log("Chocó con alien morado");
			}
			else
			{
				color = "green"
				//powerUpVerdeActivado = true;
				console.log("Chocó con alien verde");
				activarPowerUp("verde");
			}
			
			//Para activar sólo el powerup del primer alien con el que se choca
			break;
		}
	}
}



/*--------------------------------------------------------- FIN SPACE INVADERS -----------------------------------------------------------*/


/* -------------------------------------------------------- INICIO PONG -----------------------------------------------------------------*/

var speedX = 5, speedY = 5, ballX = 300, ballY = 200;
var speed = 60, paddle1X = jugador.x, paddle1Y = jugador.y, paddle2X = WIDTH / 2, paddle2Y = 100;
var radio = 15;
var anguloFinal = 360 * Math.PI / 180;	

//var timerReinicioPong = 0;
//var pongScore = false;
var pongScoreCount = 0;
var pongScoreLimit = 3; //3 para el primer nivel. Anotas 3 veces y el pong se detiene. Si te anotan, aunque sea una vez, mueres.
//var pongLoss = false;

function clear(){
	ctx.globalAlpha = 0.6;
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = "#FFF";
	ctx.clearRect(0,0, WIDTH, HEIGHT);
	ctx.fillText("Vidas: "+ jugador.vidas + "           Score: " + score, 50, 50 );
}

function drawBall(color){	
	ctx.beginPath();
	ctx.arc(ballX, ballY, radio, 0, anguloFinal, false);
	ctx.strokeStyle = color;
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
	ctx.lineTo(paddle2X + 180, paddle2Y);
	ctx.lineWidth = 20;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#ABC231";
	ctx.stroke();		
}

function detectCollisionsPong()
{
	/* 	Para paddles a los lados
	if(ballX <= paddle1X + 20 + radio && ballY >= paddle1Y && ballY <= paddle1Y + 180 || ballX >= paddle2X - 20 - radio && ballY >= paddle2Y && 			ballY <= paddle2Y + 180){ //Chocó con paddle1 || paddle2
		speedX *= -1;
	}
	*/
		//Para paddles arriba y abajo
		if( (ballY + radio >= paddle1Y && ballX + radio >= paddle1X - jugadorWidth && ballX - radio <= paddle1X) || (ballY - radio <= paddle2Y + 20 && ballX + radio >= paddle2X && ballX - radio <= paddle2X + 180)) //Chocó con paddle1 || paddle2
		{
			speedY *= -1;
		}
}

function movePaddle2()
{
	paddle2X += speedX / 2;
	
	if(paddle2X <= 0)						paddle2X = 0;
	else if(paddle2X + 180 >= WIDTH) 		paddle2X = WIDTH - 200;
}

function resetPong()
{
	ballX = WIDTH / 2;
	ballY = HEIGHT / 2;
}

lienzo.onmousemove = function(event)
{
	paddle1X = event.clientX;	
}


/* -------------------------------------------------------- FIN PONG -----------------------------------------------------------------*/

/* -------------------------------------------------------- GAME LOOP ----------------------------------------------------------------*/


	
	

function gameOver()
{
	music.stop();
		  
	deathSFX.play();
		  
	//Game over scene y audio
    gameOverMusic.play();
    stopGame();
}


//UPDATE
update = function() 
{
	//timerReinicioPong++;
	timerDisparoAlien++;
	timerDesplazoAlien++;
	timerPowerupActivo++;
	
    //limpiar canvas
	clear();
	
	//drawPaddle1();
	
	if(pongScoreCount < pongScoreLimit)
	{
		movePaddle2();
		drawPaddle2();
		//dibujar
		drawBall(color);
	
		//ball
		if (ballX + radio > WIDTH || ballX - radio < 0)		
		{
			 speedX *= -1;
	   	} 
	    if (ballY - radio > HEIGHT)  
	    {	 
		    score -= 100;
		    gameOver();
		    //Reset
		    resetPong();
	    } 
	    else if(ballY + radio  < 0)
	    {
		    pongScoreCount++;
	    	 //Reset
	    	resetPong();
	    }
	    
	    detectCollisionsPong();
	    
	  
	    ballX += speedX;
		ballY += speedY;
	  
	}
	
  	/* SPACE INVADERS */
  	
  	dibujarJugador();
  	
  	for(var id in listaBalas)
  	{
		dibujarBala(listaBalas[id]);
	}
  	
	for(var id in listaBalasEnemigos)
	{
		dibujarBala(listaBalasEnemigos[id]);
		var colision = hacerColisionJug(listaBalasEnemigos[id], jugador);
		
		if(colision) 
		{
		  delete listaBalasEnemigos[id];
		  jugador.vidas = jugador.vidas - 1;
		  
		  gameOver();
		  
		  console.log('Perdiste');
		  break;
		}
	}

  	for(var id in listaEnemigos) 
  	{
  		dibujarAlien(listaEnemigos[id], timerDesplazoAlien);
	}	

	for(var i in listaBalas)
	{
		for (var j in listaEnemigos)
		{
			var colision = hacerColisionEne(listaEnemigos[j], listaBalas[i]);
			
			if(colision)
			{
				alienKilledSFX.play();
				delete listaEnemigos[j];
				enemyCount--;
				
				delete listaBalas[i];
				
				score += 100;
				break;
			}
		}
	}
	
	//Detectar powerups
	if(timerPowerupActivo >= limiteDuracionPowerup)
    {
    	detectarPowerUps();
    }
   
	
	//Tiempo para que los aliens disparen
	if(timerDisparoAlien >= 200)
	{
		timerDisparoAlien = 0;
		
		for(i = 0; i < 10; i++)
		{
			generarBalas();
		}	
	}
	
	//Tiempo para que los aliens bajen
	if(timerDesplazoAlien >= 750)
	{
		timerDesplazoAlien = 0;
	}
	
	//Pantalla perdiste
	if(jugador.vidas == 0 || score < 0 || (ballY - radio)  > HEIGHT)
	{
		window.location="gameover.html";
		console.log("perdiste");
	}	
}
	

	window.onload = function(){
	
	$('body').css({"background-color": "black"});
	//ctx.font('20px arcade');
	ctx.font = 'bold 30px monospace';
	ctx.fillStyle = 'white';
	ctx.globalAlpha = 1;
	
	}
	 
    var music = new Audio('audio/mercury.mp3');
	music.play();
	
	//60 fps = 17 ms
	var interval = setInterval(update, 17);
	
	function stopGame()
	{
		clearInterval(interval);
	}

	dibujarJugador();
	