

class GameScene{
    constructor(frames,jumpFrames,idleFrames,cactusObjects){

        this.h_posX = 0;
        this.h_posY = windowHeight/2;
        this.h_speed = 0.5;
        this.heroObject = new Hero(frames,jumpFrames,idleFrames,this.h_posX,this.h_posY,this.h_speed);

        this.cactusObject = cactusObjects[0];
    }

    render(){

        this.heroObject.stop = false;
        this.heroObject.render();
        this.heroObject.animate();

        if(!this.heroObject.isjumped){
            this.heroObject.runAnimation();
        }else{
            this.heroObject.jumpAnimation();
        }

        this.cactusObject.stop = false;
        this.cactusObject.render();

        this.showScoreBoard();
    }

    isCollisionOccured(){
        let heroBottom = this.heroObject.posY + this.heroObject.height;
        let heroLeft = this.heroObject.posX;
        let heroRight = this.heroObject.posX + this.heroObject.width;
        let heroTop = this.heroObject.posY;

        let cactusBottom = this.cactusObject.posY + this.cactusObject.height;
        let cactusLeft = this.cactusObject.posX;
        let cactusRight = this.cactusObject.posX + this.cactusObject.width;
        let cactusTop = this.cactusObject.posY;

        if( heroTop > cactusBottom || heroRight < cactusLeft || heroBottom < cactusTop || heroLeft > cactusRight){
            return false;
        }else{
            this.heroObject.reset();
            this.cactusObject.reset();
            return true;
        }
    }

    showScoreBoard(){
        fill(200,200,200);
        // textSize(32);
        textFont(gameFont,32);
        let score = round(frameCount/24);
        let highScore = getItem("highScore");
        text("HIGH: "+highScore+"\nSCORE: "+score,windowWidth-300,50);
        storeItem("score",score);
        if(score > highScore){
            storeItem("highScore",score);
        }
    }
}