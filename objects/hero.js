class Hero{
    constructor(frames,jumpFrames,idleFrames,posX,posY,speed){
        this.frames = frames;
        this.jumpFrames = jumpFrames;
        this.idleFrames = idleFrames;
        this.posX = posX;
        this.posY = posY;

        this.width = windowWidth/15;
        this.height = windowHeight/7;

        this.posY += this.height;

        this.y_position = this.posY;

        this.x_velocity = 0;
        this.y_velocity = 0;
        this.isjumped = false;

        this.speed = speed;
        this.animationLength = this.frames.length;
        this.jumpLength = this.jumpFrames.length;
        this.idleLength = this.idleFrames.length;
        this.aniIndex = 0;
        this.jumpAniIndex = 0;
        this.idleAniIndex = 0;

        this.isIdle = true;
        this.stop = false;
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

        if(this.posX >= windowWidth/3){
            this.posX = windowWidth/3;
        }
            
    }

    runAnimation(){
        let index = floor(this.aniIndex) % this.animationLength;
        // stroke(51);
        // rect(this.posX,this.posY,this.width,this.height);
        image(this.frames[index],this.posX,this.posY,this.width,this.height);
    }
    
    jumpAnimation(){
        let index = floor(this.jumpAniIndex) % this.jumpLength;
        image(this.jumpFrames[index],this.posX,this.posY,this.width,this.height);
    }

    idleAnimation(){
        let index = floor(this.idleAniIndex) % this.idleLength;
        image(this.idleFrames[index],this.posX,this.posY,this.width,this.height);
    }

    animate(){
        if(!this.stop){
            this.aniIndex += this.speed;
            this.jumpAniIndex += 1;
            this.idleAniIndex += 1;
            this.posX += (this.isIdle)?0:6;
        }
    }

    reset(){
        this.stop = true;
        this.posX = 0;
    }

    jump(){
		if(!this.isjumped){
			this.y_velocity -= windowHeight/15;
            this.isjumped = true;
        }
    }
}