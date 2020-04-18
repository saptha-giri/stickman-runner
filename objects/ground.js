class Ground{
    constructor(image){
        this.image = image;
        this.speed = 5;
        this.posX = 0;
        this.posY = windowHeight - 180;

        this.width = windowWidth;
        this.height = 10;
    }

    render(){
        image(this.image,this.posX,this.posY,this.width,this.height);
    }


}