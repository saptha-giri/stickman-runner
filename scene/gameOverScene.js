class GameOverScene{
    constructor(){

    }

    render(){
        fill(200,200,200);
        textFont(gameFont,64);
        text("GAME OVER",(windowWidth/3),windowHeight/3);
        textFont(gameFont,32);
        let score = (getItem("score") == null)?0:getItem("score");
        let highScore = getItem("highScore");
        text("HIGH: "+highScore+"\nSCORE: "+score,windowWidth/3,windowHeight/2);

        text("RETRY",(windowWidth/2),windowHeight/2);
        noFill();
        stroke(200,200,200)
        rect((windowWidth/2)-20,(windowHeight/2)-45, 150, 55, 50);

        console.log(score);
        console.log(highScore);

        if(mouseX>=(width/2)-40 && mouseX <= ((width/2)-40)+150 && mouseY >= (height/2)-45 && mouseY <= ((height/2)-45)+55){
            cursor(HAND)
        }else{
            cursor(ARROW)
        }
    }

    retryButtonClick(){
        if(mouseX>=(width/2)-40 && mouseX <= ((width/2)-40)+150 && mouseY >= (height/2)-45 && mouseY <= ((height/2)-45)+55){
            storeItem("gameState",true);
            storeItem("gameOverState",false);
        }
    }
}