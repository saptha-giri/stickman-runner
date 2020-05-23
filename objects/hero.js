class Hero{
    constructor(frames,jumpFrames,posX,posY,speed){
        this.frames = frames;
        this.jumpFrames = jumpFrames;
        this.posX = posX;
        this.posY = posY;

        this.width = windowWidth/20;
        this.height = windowHeight/5;

        this.posY += this.height;

        this.y_position = this.posY;

        this.x_velocity = 0;
        this.y_velocity = 0;
        this.isjumped = false;

        this.speed = speed;
        this.animationLength = this.frames.length;
        this.jumpLength = this.jumpFrames.length;
        this.aniIndex = 0;
        this.jumpAniIndex = 0;
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
            
    }

    runAnimation(){
        let index = floor(this.aniIndex) % this.animationLength;
        image(this.frames[index],this.posX,this.posY,this.width,this.height);
    }
    
    jumpAnimation(){
        let index = floor(this.jumpAniIndex) % this.jumpLength;
        image(this.jumpFrames[index],this.posX,this.posY,this.width,this.height);
        console.log(this.jumpFrames[index])
    }

    animate(){
        this.aniIndex += this.speed;
        this.jumpAniIndex += this.speed;
    }

    jump(){
		if(!this.isjumped){
			this.y_velocity -= 50;
            this.isjumped = true;
            
        }
    }
}