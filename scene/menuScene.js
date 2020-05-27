class MenuScene{
    constructor(){

    }

    render(){
        fill(200,200,200);

        textFont(gameFont,64);
        text("DINO RUN",(width/2)-150,height/3); 
        textSize(32);
        text("play",(width/2),height/2);
    
        noFill();
        stroke(200,200,200)
        rect((width/2)-40,(height/2)-45, 150, 55, 50);
    
    
    
        if(mouseX>=(width/2)-40 && mouseX <= ((width/2)-40)+150 && mouseY >= (height/2)-45 && mouseY <= ((height/2)-45)+55){
            cursor(HAND)
        }else{
            cursor(ARROW)
        }
    }

    playButtonClick(){
        if(mouseX>=(width/2)-40 && mouseX <= ((width/2)-40)+150 && mouseY >= (height/2)-45 && mouseY <= ((height/2)-45)+55){
            storeItem("menuState",false);
            storeItem("gameState",true);
        }
    }
}