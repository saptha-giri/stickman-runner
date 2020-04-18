let data;

let ground;
let groundObject;
let clouds = [];
let cactusArray = [];
let heroFrames = [];


let cloudObjects = [];
let cactusObjects = [];
let heroObject;
let cactusObj1,cactusObj2;

let gameFont;
let menuState = false;
let gameState = false;

let randomCheck;
let bg;

let score = 0;
let highScore = 0;


function preload(){

    data = loadJSON("objects/data.json",()=>{
        for(let cloud of data.cloudsObj){
            clouds.push(loadImage(cloud.path));
        }
        
        for(let cact of data.cactus){
            cactusArray.push(loadImage(cact.path));
        }

        for(let sprite of data.stickman.fast){

            heroFrames.push(loadImage(sprite.path));
        }
    });

    ground = loadImage("assets/plain-ground.png");
    bg = loadImage("assets/bg.png");

    gameFont = loadFont("lib/font/MunichRegular-Y8x4.ttf")

    menuState = getItem("menuState");

    if(menuState == null){
        menuState = true;
        storeItem("menuState",menuState);
    }
    
    gameState = getItem("gameState");

    if(gameState == null){
        gameState = true;
        storeItem("gameState",gameState);
    }
    
    highScore = getItem("highScore");

    if(highScore == null){
        storeItem("highScore",highScore);
    }
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    groundObject = new Ground(ground);

    for(let index=0; index<clouds.length; index++){
        let obj = data.cloudsObj[index];
        let cloud = clouds[index];
        cloudObjects.push(new Cloud(cloud,width-obj.posX,height/obj.posY,obj.width,obj.height,obj.speed));
    }
    
    for(let index=0; index<cactusArray.length; index++){
        let obj = data.cactus[index];
        let cactu = cactusArray[index];
        cactusObjects.push(new Cactus(cactu,windowWidth,height-obj.posY,obj.width,obj.height));
    }
    heroObject = new Hero(heroFrames,100,(height-570),0.6);
    randomCheck = 0;
    cactusObj1 = cactusObjects[randomCheck];
    cactusObj2 = cactusObjects[2];
    cactusObj2.posX = cactusObj1.posX+(windowWidth/2);

    frameRate(32)
}

function draw(){
    background('#FFFFFF');

    // image(bg,0,0,windowWidth,windowHeight);

    menuState = getItem("menuState");
    gameState = getItem("gameState");

    renderClouds();

    if(menuState){
        loadMenu();
    }else if(gameState){
        loadGame();
        renderScoreBoard();
    }    
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

function loadMenu(){
    fill(0,100,200);

    textFont(gameFont,64);
    text("STICKMAN RUNNER",(width/2)-150,height/3); 
    textSize(32);
    text("play",(width/2),height/2);

    noFill();
    rect((width/2)-40,(height/2)-45, 150, 55, 50);



    if(mouseX>=(width/2)-40 && mouseX <= ((width/2)-40)+150 && mouseY >= (height/2)-45 && mouseY <= ((height/2)-45)+55){
        cursor(HAND)
    }else{
        cursor(ARROW)
    }
    
}

function renderClouds(){
    groundObject.render();
    cloudObjects[0].render();
    cloudObjects[1].render();
    cloudObjects[2].render();
    cloudObjects[3].render();
}

function mouseClicked() {
    
    if(mouseX>=(width/2)-40 && mouseX <= ((width/2)-40)+150 && mouseY >= (height/2)-45 && mouseY <= ((height/2)-45)+55){
        console.log("mouseX : "+mouseX)
        console.log("mouseY : "+mouseY)

        storeItem("menuState",false);
        storeItem("gameState",true);
    }

    if(!heroObject.isjumped){
        heroObject.jump();
    }
}

function loadGame(){
    cactusObj1.render();
    cactusObj2.render();

    if(cactusObj1.posX < -(cactusObj1.width)){
        randomCheck = round(random(cactusObjects.length-2));
        cactusObj1 = cactusObjects[randomCheck];
    }
    heroObject.render();
    heroObject.animate();

    /* 
      GAME COLLISION DETECTION 
    */    

    if((cactusObj1.posX+cactusObj1.width) <=(heroObject.posX+heroObject.width) && 
        (heroObject.posY+heroObject.height)>=(cactusObj1.posY + cactusObj1.height)){

        if(cactusObj1.posX+cactusObj1.width >= heroObject.posX){
            noLoop();
        }
    }
    if((cactusObj2.posX+cactusObj2.width) <=(heroObject.posX+heroObject.width) && 
    (heroObject.posY+heroObject.height)>=(cactusObj2.posY + cactusObj2.height)){

        if(cactusObj2.posX+cactusObj2.width >= heroObject.posX){
            noLoop();
        }
        
    }
}

function renderScoreBoard(){
    fill(0,100,200);
    textSize(32);
    score = round(frameCount/24);
    highScore = getItem("highScore");
    text("HIGH: "+highScore+"\nSCORE: "+score,windowWidth-300,50);
    if(score > highScore){
        storeItem("highScore",score);
    }
}