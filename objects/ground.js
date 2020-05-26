class Ground{
    constructor(image,posX,posY,width,height,speed){
        this.image = image;
        this.speed = 15;
        this.posX = posX;
        this.posY = posY;

        this.width = width;
        this.height = height;

        this.posY += this.height;
    }

    render(){
        this.posX = (this.posX < -this.width)?0:this.posX -= this.speed;
        image(this.image,this.posX,this.posY,this.width,this.height);
        image(this.image,this.posX+this.width,this.posY,this.width,this.height);
    }


}