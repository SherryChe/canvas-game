/**
 * Created by chenxq on 2017/6/29.
 */
var game={
    gameover:false,
    keysDown:{},
    option:{
        width:512,
        height:480,
        monsterNum:10,
        monsterSpeed:2,
        heroSpeed:10,
        catchNum:0
    },
    monsters:[],
    bg:{
        src:"./images/background.png",
        x:0,
        y:0
    },
    hero:{
        src:"./images/hero.png",
    },
    monster:{
        src:"./images/monster.png"
    },
    showImg(option){
        var imgNode=new Image();
        imgNode.src=option.src;
        this.ctx.drawImage(imgNode, option.x, option.y);
    },
    showText(){
        this.ctx.fillStyle = "rgb(250, 250, 250)";
        this.ctx.font = "24px Helvetica";
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.fillText("Goblins caught: " + this.option.catchNum, 32, 32);
    },
    render(){
        this.showImg(this.bg);
        var heroX=this.hero.x,
            heroY=this.hero.y;
        for(var i=0; i<this.monsters.length; i++){
            var item=this.monsters[i];
            var monsterX=item.x,
                monsterY=item.y;
            if (
                heroX <= (monsterX + 32)
                && monsterX <= (heroX + 32)
                && heroY <= (monsterY + 32)
                && monsterY <= (heroY + 32)
            ){
                this.option.catchNum++;
                this.monsters.splice(i,1);
                break;
            }else{
                item.move();
            }
        }
        this.heroUpdate();
        this.showImg(this.hero);
        this.showText();
    },
    createCanvas(){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.option.width;
        this.canvas.height = this.option.height;
        document.body.appendChild(this.canvas);
    },
    heroListen(){
        var _this=this;
        addEventListener("keydown", function (e) {
            _this.keysDown[e.keyCode] = true;
        }, false);
        addEventListener("keyup", function (e) {
            delete _this.keysDown[e.keyCode];
        }, false);
    },
    heroUpdate(){
        var speed=this.option.heroSpeed;
        if (38 in this.keysDown && this.hero.y > 32) { // Player holding up
            this.hero.y -= speed;
        }
        if (40 in this.keysDown && this.hero.y<(this.option.height-2*32)) { // Player holding down
            this.hero.y += speed;
        }
        if (37 in this.keysDown && this.hero.x >32) { // Player holding left
            this.hero.x -= speed;
        }
        if (39 in this.keysDown && this.hero.x <(this.option.width- 2*32)) { // Player holding right
            this.hero.x += speed;
        }
    },
    main(){
        var w = window;
        requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
        if(!this.gameover){
            this.render();
        }
        this.animation=requestAnimationFrame(this.main.bind(this));
    },
    goon(){
        this.gameover=false;
    },
    restart(){
        this.option.catchNum=0;
        this.monsters=[];
        this.keysDown={};
        this.init();
    },
    init(){
        this.ctx ? this.ctx.clearRect(0,0,this.option.width,this.option.height) : this.createCanvas();
        this.hero.x= this.option.width/2;
        this.hero.y=this.option.height/2;
        for(var i=0; i<this.option.monsterNum; i++){
            var monster=new monsterFunc(this.canvas);
            this.monsters.push(monster);
        }
        this.heroListen();
        this.animation && cancelAnimationFrame(this.animation);
        this.main();
    }
}
game.init();
document.getElementById("restart").onclick=function(){
    game.restart();
}
document.getElementById("goon").onclick=function(){
    game.goon();
}