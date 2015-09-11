
var lienzo = document.getElementById("lienzo");
var contexto = lienzo.getContext("2d");
var WIDTH = lienzo.width, HEIGHT = lienzo.height;
var speedX = 20, speedY = 10, ballX = 300, ballY = 200;
var speed = 60, paddle1X = 50, paddle1Y = 0, paddle2X = WIDTH - 50, paddle2Y = 100;
var radio = 15;
var anguloFinal = 360 * Math.PI / 180;	

window.onload = function()
{
	//limpiar canvas
	contexto.fillStyle = "#f0f0f0";
	contexto.fillRect(0, 0, WIDTH, HEIGHT);
	//dibujar
	drawBall();
	drawPaddle1();
	init();
	
}


function draw()
{
	//limpiar canvas
	clear();
	
	drawPaddle1();
	drawPaddle2();
	//dibujar
	drawBall();
	
	//ball
	if (ballX + radio > WIDTH || ballX - radio < 0)		 speedX *= -1;
   		 
    if (ballY + radio > HEIGHT || ballY - radio  < 0)  	 speedY *= -1;
   
    detectCollisions();
   
    ballX += speedX;
	ballY += speedY;
    	 
}


function clear() 
{
  contexto.globalAlpha = 0.6;
  contexto.fillStyle = "#f0f0f0";
  contexto.fillRect(0, 0, WIDTH, HEIGHT);
  contexto.globalAlpha = 1.0;
}

function drawBall()
{	
	contexto.beginPath();
	contexto.arc(ballX, ballY, radio, 0, anguloFinal, false);
	contexto.strokeStyle = "blue";
	contexto.stroke(); 
	return;
}

function drawPaddle1()
{
	//limitar el paddle1 a la pantalla
	if(paddle1Y <= 0) 					paddle1Y = 0;
	else if(paddle1Y + 180 >= HEIGHT) 	paddle1Y = HEIGHT - 200;
	
	//draw paddle 
	contexto.beginPath();
	contexto.moveTo(paddle1X, paddle1Y);
	contexto.lineTo(paddle1X, paddle1Y + 180);
	contexto.lineWidth = 20;
	contexto.lineCap = "round";
	contexto.strokeStyle = "#ABC231";
	contexto.stroke();	
	
}

function drawPaddle2()
{

	//draw paddle 
	contexto.beginPath();
	contexto.moveTo(paddle2X, paddle2Y);
	contexto.lineTo(paddle2X, paddle2Y + 180);
	contexto.lineWidth = 20;
	contexto.lineCap = "round";
	contexto.strokeStyle = "#ABC231";
	contexto.stroke();	
	
}



function detectCollisions()
{
	if(ballX <= paddle1X + 20 + radio && ballY >= paddle1Y && ballY <= paddle1Y + 180 || ballX >= paddle2X - 20 - radio && ballY >= paddle2Y && 			ballY <= paddle2Y + 180) //Chocó con paddle1 || paddle2
	{
		speedX *= -1;
	}
}


function init()
{
	return setInterval(draw, speed);
}

lienzo.onmousemove = function(event)
{
	paddle1Y = event.clientY;	
}



