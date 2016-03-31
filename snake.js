var jg = new jsGraphics("pentagon");

var jadlo;
var wynik;
var tab=new Array(55);
for(var i=0; i<55; i++)
tab[i]=new Array(55);



var aktualny;
var timer;
var kierunek;
var gra;
var r;

var x  = new Queue();
var y = new Queue();


function init(){
   jadlo = document.getElementById('jadlo');
   wynik = document.getElementById('wynik');
   document.onkeydown = klawiszologia;
   aktualny = 0;
   kierunek = 2;
   clearTimeout(timer);
   for(var i=0; i<36; i++)
   for(var j=0; j<50; j++)
   tab[i][j]=0;
   gra =1;
   r=0;
   curx = 0;
   cury = 3;
   while(!x.empty()){x.pop(); y.pop();}
   x.push(0);
   x.push(0);
   y.push(1);
   y.push(2);
   tab[1][0]=1;
   tab[2][0]=1;
   jadlo.style.left=(Math.round(Math.random()*500)%50)*8;
   jadlo.style.top=(Math.round(Math.random()*350)%35)*8;
   wynik.style.backgroundColor = 'rgb(255,255,255)';
   start();
}


function klawiszologia(e){
   if(!e){
      e = window.event;
   }
   if(r==1){
   if(e.keyCode==37)
	if(kierunek!=1){kierunek=3; r=0;}  //lewo

   if(e.keyCode==39)
	if(kierunek!=3){kierunek=1; r=0;}  //prawo

   if(e.keyCode==38)
	if(kierunek!=2){kierunek=4; r=0;}  //gora

   if(e.keyCode==40)
	if(kierunek!=4){kierunek=2; r=0;}  //dol

   }
}


function start(){
   ruch();
   render();
   if(gra==1)timer = setTimeout('start()',50);
   else gameOver();
}

function ruch() {

if((curx*8+"px"==jadlo.style.left||curx*8==jadlo.style.left)&&((cury-1)*8+"px"==jadlo.style.top||(cury-1)*8==jadlo.style.top)){
   jadlo.style.left=(Math.round(Math.random()*500)%50)*8;
   jadlo.style.top=(Math.round(Math.random()*350)%35)*8;
   aktualny+=10;
}else
tab[y.pop()][x.pop()]=0;

switch(kierunek)
{
case 1:
  if(tab[cury][curx+1]!=1&&curx+1<50){
	x.push(curx);
	y.push(cury);
	curx++;
  }else gra=0;
  break;

case 2:
  if(tab[cury+1][curx]!=1&&cury+1<=35){
	x.push(curx);
	y.push(cury);
	cury++;
  }else gra=0;
  break;

case 3:
  if(tab[cury][curx-1]!=1&&curx-1>=0){
	x.push(curx);
	y.push(cury);
	curx--;
  }else gra=0;
  break;

case 4:
  if(tab[cury-1][curx]!=1&&cury-1>0){
	x.push(curx);
	y.push(cury);
	cury--;
  }else gra=0;
  break;

}
tab[cury][curx]=1;
r=1;
}

function render() {
 jg.clear();
 jg.setColor("#000000");
for(var i=0; i<=35; i++)
for(var j=0; j<50; j++)
if(tab[i][j]==1)
  jg.fillRect(j*8, (i-1)*8, 8, 8);

  jg.paint();
  wynik.innerHTML = "Wynik: " + aktualny;
  //wynik.innerHTML += " " + cury;
  //wynik.innerHTML += " " + jadlo.style.top;
  //wynik.innerHTML += " " + curx;
  //wynik.innerHTML += " " + jadlo.style.left;
}

function gameOver(){
  clearTimeout(timer);
  wynik.innerHTML += "   Koniec Gry";
  wynik.style.backgroundColor = 'rgb(128,128,128)';
}
