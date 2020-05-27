let data;

let ground;
let groundObject;
let heroFrames = [];
let heroJumpFrames = [];


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

            let image = cloud.path;
            let posX = round(random(0,windowWidth));
            let posY = windowHeight/cloud.posY;

            let cWidth = windowWidth/cloud.width;
            let cHeight = windowHeight/10;
            let speed = cloud.speed;

            cloudObjects.push(new Cloud(loadImage(image),posX,posY,cWidth,cHeight,speed));
        }
        
        for(let cact of data.cactus){

            let image = cact.path;

            let posX = windowWidth;
            let posY = windowHeight/2;

            let cactusWidth = windowWidth/cact.width;
            let cactusHeight = windowHeight/cact.height;

            posY += cactusHeight;

            cactusObjects.push(new Cactus(loadImage(image),posX,posY,cactusWidth,cactusHeight));
        }

        for(let sprite of data.stickman.run){
            console.log(sprite.path)
            heroFrames.push(loadImage(sprite.path));
        }
        
        for(let sprite of data.stickman.jump){
            heroJumpFrames.push(loadImage(sprite.path));
        }
    });

    ground = loadImage("assets/ground.png");
    bg = loadImage("assets/bg.jpg");

    gameFont = loadFont("lib/font/AVENGEANCE_MIGHTIEST_AVENGER.ttf");
    console.log("font")

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
    groundObject = new Ground(ground,0,windowHeight/2,windowWidth,windowHeight/4);

    heroObject = new Hero(heroFrames,heroJumpFrames,0,windowHeight/2,0.5);
    randomCheck = 0;
    cactusObj1 = cactusObjects[randomCheck];
    cactusObj2 = cactusObjects[2];
    cactusObj2.posX = cactusObj1.posX+(windowWidth/2);

    frameRate(32)
}

function draw(){
    background('#FFFFFF');

    image(bg,0,0,windowWidth,windowHeight);
    groundObject.render();

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
    fill(200,200,200);

    textFont(gameFont,64);
    text("DINO RUN",(width/2)-150,height/3); 
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
    // groundObject.render();
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

    // heroObject.runAnimation();

    if(!heroObject.isjumped){
        heroObject.runAnimation();
    }else{
        heroObject.jumpAnimation();
    }

    /* 
      GAME COLLISION DETECTION 
    */    
    let heroBottom = heroObject.posY + heroObject.height;
    let heroLeft = heroObject.posX;
    let heroRight = heroObject.posX + heroObject.width;
    let heroTop = heroObject.posY;

    let cactusBottom = cactusObj1.posY + cactusObj1.height;
    let cactusLeft = cactusObj1.posX;
    let cactusRight = cactusObj1.posX + cactusObj1.width;
    let cactusTop = cactusObj1.posY;

    if( heroTop > cactusBottom || heroRight < cactusLeft || heroBottom < cactusTop || heroLeft > cactusRight){
        // noLoop();
        console.log("no collision")
    }else{
        noLoop()
    }
}

function renderScoreBoard(){
    fill(200,200,200);
    // textSize(32);
    textFont(gameFont,32);
    score = round(frameCount/24);
    highScore = getItem("highScore");
    text("HIGH: "+highScore+"\nSCORE: "+score,windowWidth-300,50);
    if(score > highScore){
        storeItem("highScore",score);
    }
}