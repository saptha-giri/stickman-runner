let data;

let ground;
let groundObject;
let heroFrames = [];
let heroJumpFrames = [];
let heroIdleFrames = [];


let cloudObjects = [];
let cactusObjects = [];
let heroObject;
let cactusObj1,cactusObj2;

let gameFont;
let menuState,gameState,gameOverState;
let bg;

let score = 0;
let highScore = 0;

let menuScene,gameScene,gameOverScene;
let isGroundUpdate = false;


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
        
        for(let sprite of data.stickman.idle){
            heroIdleFrames.push(loadImage(sprite.path));
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
        storeItem("gameState",false);
        storeItem("gameOverState",false);
    }

    // if(gameState == null){
    //     gameState = true;
    //     storeItem("gameState",gameState);
    // }
    
    highScore = getItem("highScore");

    if(highScore == null){
        storeItem("highScore",highScore);
        storeItem("score",highScore);
    }
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    groundObject = new Ground(ground,0,windowHeight/2,windowWidth,windowHeight/4);

    menuScene = new MenuScene();
    gameScene = new GameScene(heroFrames,heroJumpFrames,heroIdleFrames,cactusObjects);
    gameOverScene = new GameOverScene();

    frameRate(32)
}

function draw(){
    background('#FFFFFF');

    image(bg,0,0,windowWidth,windowHeight);
    groundObject.render(isGroundUpdate);
    renderClouds();

    menuState = getItem("menuState");
    gameState = getItem("gameState");
    gameOverState = getItem("gameOverState");

    if(menuState){
        menuScene.render();
        gameScene.heroObject.isIdle = true;
        gameScene.heroObject.render();
        gameScene.heroObject.animate();
        gameScene.heroObject.idleAnimation();
    }else if(gameState){
        isGroundUpdate = true;
        gameScene.heroObject.isIdle = false;
        gameScene.render();

        let isDead = gameScene.isCollisionOccured();
        if(isDead){
            // noLoop()
            storeItem("menuState",false);
            storeItem("gameState",false);
            storeItem("gameOverState",true);
            isGroundUpdate = false;
        }
    }else if(gameOverState){
        gameOverScene.render();
    }
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

function renderClouds(){
    cloudObjects[0].render();
    cloudObjects[1].render();
    cloudObjects[2].render();
    cloudObjects[3].render();
}

function mouseClicked() {
    
    if(menuState){
        menuScene.playButtonClick();
    }else if(gameState){
        let heroObject = gameScene.heroObject;
        if(!heroObject.isjumped){
            heroObject.jump();
        }
    }else if(gameOverState){
        gameOverScene.retryButtonClick();
    }
    
}