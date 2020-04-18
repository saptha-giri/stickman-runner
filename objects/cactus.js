class Cactus{
    constructor(image,posX,posY,width,height){
        this.image = image;
        this.posX = posX;
        this.posY = posY;

        this.width = width;
        this.height = height;

        this.speed = 15;
        this.isOut = false;
    }

    render(){

        if(this.posX < -(this.width+windowWidth/2)){
            this.posX = windowWidth;
        }
        this.posX -= this.speed;

        image(this.image,this.posX,this.posY,this.width,this.height);
    }


}