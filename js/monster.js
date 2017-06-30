/**
 * Created by chenxq on 2017/6/30.
 */
function monsterFunc(canvas){
    this.monsterImg=new Image();
    this.monsterImg.src="./images/monster.png";
    this.speedX=this.rand(1);
    this.speedY=this.rand(1);
    this.width=canvas.width;
    this.height=canvas.height;
    this.ctx = canvas.getContext("2d");
    this.monsterWidth=32;
    this.monsterHeight=32;
    this.canvas={};
    this.x=this.monsterWidth + (Math.random() * (this.width - 64));
    this.y = this.monsterHeight + (Math.random() * (this.height - 64));

}

monsterFunc.prototype={
    rand(num){
        return Math.floor(Math.random() * num + 1);
    },
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x>this.width-2*this.monsterWidth) {
            this.speedX = -this.speedX;
        }
        if (this.x<this.monsterWidth) {
            this.speedX = Math.abs(this.speedX);
        }
        if (this.y>this.height-2*this.monsterHeight) {
            this.speedY = -this.speedY;
        }
        if (this.y<this.monsterHeight) {
            this.speedY = Math.abs(this.speedY);
        }
        this.ctx.drawImage(this.monsterImg, this.x, this.y);
    }
}