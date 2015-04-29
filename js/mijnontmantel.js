var bevindtStart = true;
var bevindtExplodedview = false;
var bevindtWin = false;
var bevindtInfo = false;
var bevindtHighscore = false;
var bevindtLose = false;
var bevindtUitleg = false;
var activeer = false;
var veilig1 = false;
var veilig2 = false;
var fuse= false;
var explosionSound = new Audio('Explosion_Ultra_Bass-Mark_DiAngelo-1810420658.wav');
var canvas = document.getElementById("board");
canvas.setAttribute('width', 1920);
canvas.setAttribute('height', 1090);

var context = canvas.getContext('2d');
var canvasback = document.getElementById("backboard");
canvasback.setAttribute('width', 1890);
canvasback.setAttribute('height', 1080);

var contextback = canvasback.getContext('2d');
var mine = document.getElementById("mijn");
var mineLocation = 800
var boem = {sx:0,sy:0}
var bigExpsprite=0;
var explosion17 = document.getElementById("explosion17");   //http://www.aber.ac.uk/~dcswww/Dept/Teaching/CourseNotes/current/CS25210//slides/sprites.html  
var bigExp = document.getElementById("bigExp");

document.getElementById("uitleg").style.display="none";
document.getElementById("explodedview").style.display="none";
document.getElementById("win").style.display="none";
document.getElementById("info").style.display="none";
document.getElementById("lose").style.display="none";
document.getElementById("highscores").style.display="none";
document.getElementById("videowin").style.display="none";
// document.getElementById("videolose").style.display="none";
//mijndetector animatie
var metalDetector = document.getElementById("metaaldetector");
var sand = document.getElementById("sand");
var sandLocation= {y:0,viewport:1080};
var detectorLocation={x:-100,y:230};
var intervalDrawDetector = setInterval();
var direction = {Counter:0,bool:true};
var drawDetector = function (){
    console.log ("drawmetal")
    context.clearRect(0,0,1920,1080)
    context.drawImage(metalDetector,detectorLocation.x,detectorLocation.y)
    contextback.drawImage(sand,0, sandLocation.y, 1890, sandLocation.viewport); // context.fillRect(x, y, width, height);
    contextback.drawImage(sand,0, sandLocation.y-sandLocation.viewport, 1890, sandLocation.viewport); // context.fillRect(x, y, width, height);
    sandLocation.y+=0.5;
    if (sandLocation.y>1080) {
        sandLocation.y=0
    };
    
    if (direction.Counter<200) {    
        if (direction.bool==true) {
            detectorLocation.x+=1;
        } 
        else if (direction.bool==false) {
            detectorLocation.x-=1;
        };
    }
    else if (direction.Counter==200) {
        direction.Counter=0;
        if (direction.bool==true) {
            direction.bool=false;
        } 
        else if (direction.bool==false) {
            direction.bool=true;
        };
    }
    direction.Counter++;
}
//mijn actief
// var intervalActief = setInterval();
// var drawMineActive = function();{
//     context.clearRect(0,0,1920,1080)
// }
//explosie animatie
var intervalDrawMine = setInterval();
var intervalExplosion = setInterval();
var drawMine = function() {
        context.clearRect(0,0,1920,1080)
        context.drawImage(mijn,800,mineLocation)
        mineLocation-=15
        
        if (mineLocation<250) {
            clearInterval(intervalDrawMine);
            intervalExplosion=setInterval(bigExplosion,60)
            console.log ("stop")
            explosionSound.pause();
            explosionSound.currentTime = 0;
            explosionSound.play();

        };

}
var bigExplosion = function(){
    context.clearRect(0,0,1920,1080)
    context.drawImage(bigExp,bigExpsprite,0,256,256,460,80,1000,1000)
    if (bigExpsprite==0) {
        
        console.log("sound")
    }
    bigExpsprite+=256;

    if (bigExpsprite==12288) {
        clearInterval(intervalExplosion);
        context.clearRect(0,0,1920,1080)
    };
    
}
var loseReset =function(){
    mineLocation = 800
    bigExpsprite=0;
}
var launchExplosion = function(){                    // loopt door de sprite plaatjes heen                         
    if (boem.sx==256) {
        boem.sx=0
        if (boem.sy==0) {
            boem.sy+=64
        }
        else if (boem.sy==64) {
            boem.sy+=64
        }
        else if (boem.sy==128) {
            boem.sy+=64
        }
        else if (boem.sy==192) {
            boem.sy+=64
        }
        else if (boem.sy==256) {
            boem.sy+=64
        }
        else {                              // heeft alles laten zien dus stopt de animatie
            clearInterval(intervalExplosion);
            boem.sx=0
            boem.sy=0
        }
        
    }
    else {
        context.clearRect(0,0,1800,800)   
        context.drawImage(explosion17,boem.sx,boem.sy,64,64,850,280,550,550)
        boem.sx+=64        
        
    };
    
};
var map = []; //  keyarray     //http://stackoverflow.com/questions/5203407/javascript-multiple-keys-pressed-at-once
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    if ( map[38] && map[40] && map[32] ) {   
        if (bevindtExplodedview==true) {
            document.getElementById("explodedview").style.display="none";
             document.getElementById("win").style.display="block";
            // document.getElementById("videowin").style.display="block";

            clearInterval(timer);
            bevindtWin = true;
            bevindtExplodedview = false;
        }
        map = [];
    }
    else if (map[87]) { //w   mijn ontploft
        if (bevindtExplodedview==true) {
            document.getElementById("explodedview").style.display="none";
            document.getElementById("lose").style.display="block";
            // document.getElementById("videolose").style.display="block";
            bevindtExplodedview = false;
            bevindtLose = true; 
            console.log ("you lost");
            canvas.className = "show";
            loseReset();
            intervalDrawMine=setInterval(drawMine,10)
            clearInterval(timer);
        }
        map = [];        
    }
    else if (map[37]) { //links
        console.log ("links37")
        if (bevindtStart==true) {   // naar uitleg vanuit start
            document.getElementById("start").style.display="none";
            document.getElementById("uitleg").style.display="block";
            bevindtStart = false;
            bevindtUitleg = true;
            clearInterval(intervalDrawDetector);
            context.clearRect(0,0,1920,1090)
            canvasback.className = "hide";
            activeer=true;
            clearInterval(timer);
        }
        else if (bevindtUitleg==true) {   // naar explodedview vanuit uitleg
            document.getElementById("explodedview").style.display="block";
            document.getElementById("uitleg").style.display="none";
            bevindtExplodedview = true;
            bevindtUitleg = false;
            activeer=false;            
            counter=0;
            minutecounter=0;
            timer = setInterval(bombTimer, 1000);


        }
        else if (bevindtExplodedview==true) {   // naar Start vanuit explodedview
            document.getElementById("uitleg").style.display="block";
            document.getElementById("explodedview").style.display="none";
            bevindtUitleg = true;
            bevindtExplodedview = false;
            timerCon.style.background="black";
            clearInterval(timer);

        }
        else if (bevindtWin==true) {    // naar Start vanuit win
            document.getElementById("start").style.display="block";
            document.getElementById("win").style.display="none";
            // document.getElementById("videowin").style.display="none";
            bevindtStart = true;
            bevindtWin = false;
            intervalDrawDetector = setInterval(drawDetector,30);
            canvasback.className = "show";
            clearInterval(timer);
        }
        else if (bevindtHighscore==true) {  // naar Start vanuit highscore
            document.getElementById("start").style.display="block";
            document.getElementById("highscores").style.display="none";
            bevindtStart = true;
            bevindtHighscore = false;
            intervalDrawDetector = setInterval(drawDetector,30);
            canvasback.className = "show";
            clearInterval(timer);
        }
        else if (bevindtInfo==true) {   // naar Start vanuit info
            document.getElementById("start").style.display="block";
            document.getElementById("info").style.display="none";
            bevindtStart = true;
            bevindtInfo = false;
            console.log ("naar Start vanuit info");
            intervalDrawDetector = setInterval(drawDetector,30);
            canvasback.className = "show";
            clearInterval(timer);
        }
        else if (bevindtLose==true) {   // naar Start vanuit lose
            document.getElementById("start").style.display="block";
            document.getElementById("lose").style.display="none";
            // document.getElementById("videolose").style.display="none";
            bevindtStart = true;
            bevindtLose = false;
            console.log ("nnaar Start vanuit lose");
            intervalDrawDetector = setInterval(drawDetector,30);
            canvasback.className = "show";
            clearInterval(timer);
        };
map = [];
    }
    else if (map[39]) { //rechts
        if (bevindtStart==true) {   // naar info vanuit start
            document.getElementById("start").style.display="none";
            document.getElementById("info").style.display="block";
            bevindtStart = false;
            bevindtInfo = true;
            console.log ("naar info vanuit start");
            clearInterval(intervalDrawDetector);
            context.clearRect(0,0,1920,1090)
            canvasback.className = "hide";
            clearInterval(timer);               
        }
            else if (bevindtUitleg==true) {   // naar info vanuit uitleg
            document.getElementById("uitleg").style.display="none";
            document.getElementById("info").style.display="block";
            bevindtUitleg = false;
            bevindtInfo = true;
            console.log ("naar info vanuit uitleg");
            clearInterval(timer);
               
        }
        else if (bevindtExplodedview==true) {   // naar lose vanuit Explodedview
            document.getElementById("explodedview").style.display="none";
            document.getElementById("lose").style.display="block";
            //document.getElementById("videolose").style.display="block";
            bevindtExplodedview = false;
            bevindtLose = true;
            loseReset(); 
            console.log ("naar info vanuit start");
            timerCon.style.background="black";
            clearInterval(timer);                
        }
        else if (bevindtWin==true) {   // naar highscores vanuit win
            document.getElementById("win").style.display="none";
            document.getElementById("highscores").style.display="block";
            // document.getElementById("videowin").style.display="none";
            bevindtWin = false;
            bevindtHighscore = true; 
            console.log ("naar info vanuit start");
            clearInterval(timer);                
            }
        else if (bevindtHighscore==true) {   // naar info vanuit highscore
            document.getElementById("highscores").style.display="none";
            document.getElementById("info").style.display="block";
            bevindtHighscore = false;
            bevindtInfo = true; 
            console.log ("naar info vanuit start"); 
            clearInterval(timer);               
            }
        else if (bevindtInfo==true) {   // naar highscores vanuit info
            document.getElementById("info").style.display="none";
            document.getElementById("highscores").style.display="block";
            bevindtInfo = false;
            bevindtHighscore = true; 
            console.log ("naar info vanuit start"); 
            clearInterval(timer);               
            }
        else if (bevindtLose==true) {   // naar explodedview vanuit lose
            document.getElementById("lose").style.display="none";
            document.getElementById("explodedview").style.display="block";
            // document.getElementById("videolose").style.display="none";
            bevindtLose = false;
            bevindtExplodedview = true; 
            console.log ("naar info vanuit start");
            counter=0;
            minutecounter=0;
            timer = setInterval(bombTimer, 1000);
            clearInterval(timer);                
        }
        map = [];
    }; 
} 
intervalDrawDetector = setInterval(drawDetector,30);

var counter = 00,
    timer, 
    timerCon = document.querySelector(".timer");
var minutecounter = 0

timerCon.innerHTML = "<p>"+ minutecounter + ":" + counter + "</p>";   
var colorBool=false;   

    function bombTimer(){
        // counter = counter+1;
        counter +=1;
        if (colorBool==false) {
            timerCon.style.background="red";
            colorBool=true;
        } 
        else if (colorBool==true) {
            timerCon.style.background="black";
            colorBool=false;
        }
        timerCon.innerHTML = "<p>"+ minutecounter + ":" + counter + "</p>";
         
        if(counter >= 60){
           counter=0;
           minutecounter++;
 
        }
    }



