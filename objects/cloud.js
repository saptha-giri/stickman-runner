class Cloud{
    constructor(image,posX,posY,width,height,speed){
        this.image = image;
        this.posX = posX;
        this.posY = posY;

        this.width = width;
        this.height = height;

        this.speed = speed;
    }

    render(){
        this.posX = (this.posX < -this.width)?windowWidth:this.posX -= this.speed;
        image(this.image,this.posX,this.posY,this.width,this.height);
    }


}