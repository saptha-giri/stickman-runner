class Hero{
    constructor(frames,posX,posY,speed){
        this.frames = frames;
        this.posX = posX;
        this.posY = posY;

        this.y_position = height-470;

        this.x_velocity = 0;
        this.y_velocity = 0;
        this.isjumped = false;

        this.width = 250;
        this.height = 380;

        this.speed = speed;
        this.animationLength = this.frames.length;
        this.aniIndex = 0;
    }

    render(){

        this.y_velocity += 2.5;// gravity
		this.posX += this.x_velocity;
		this.posY += this.y_velocity;
		this.x_velocity *= 0.9;// friction
        this.y_velocity *= 0.9;// friction

        // console.log(this.posY)
        
        if(this.posY>this.y_position){
			this.posY = this.y_position;
			this.y_velocity = 0;
			this.isjumped =  false;
		}

        let index = floor(this.aniIndex) % this.animationLength;
        image(this.frames[index],this.posX,this.posY,this.width,this.height);
    }

    animate(){
        this.aniIndex += this.speed;
    }

    jump(){
		if(!this.isjumped){
			this.y_velocity -= 50;
			this.isjumped = true;
        }
    }
}